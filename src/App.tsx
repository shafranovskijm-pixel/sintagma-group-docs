import { useMemo, useState } from "react";
import { SAMPLE_CONTEXT } from "./lib/sampleContext";
import { getAllTemplates } from "./lib/templates";
import { generateDocument, downloadHtml, previewHtml } from "./lib/generate";
import { buildVariables, VARIABLE_CATALOG } from "./lib/variables";
import type { DocType, GeneratedDocument } from "./lib/schema";

export default function App() {
  const [docs, setDocs] = useState<GeneratedDocument[]>([]);
  const [selected, setSelected] = useState<GeneratedDocument | null>(null);
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"docs" | "vars">("docs");
  const [price, setPrice] = useState(45000);
  const [error, setError] = useState<string | null>(null);

  const templates = getAllTemplates();
  const ctx = useMemo(
    () => ({ ...SAMPLE_CONTEXT, extras: { ...SAMPLE_CONTEXT.extras, total_price: price } }),
    [price]
  );
  const previewVars = useMemo(
    () => buildVariables(ctx, { documentNumber: "2026-001", totalPrice: price }),
    [ctx, price]
  );

  const runOne = (docType: DocType) => {
    setBusy(true);
    setError(null);
    try {
      const doc = generateDocument(ctx, docType, { totalPrice: price });
      setDocs((prev) => [doc, ...prev]);
      setSelected(doc);
      setTab("docs");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка генерации");
    } finally {
      setBusy(false);
    }
  };

  const runPackage = () => {
    setBusy(true);
    setError(null);
    try {
      const generated = templates.map((t) => generateDocument(ctx, t.doc_type, { totalPrice: price }));
      setDocs((prev) => [...generated, ...prev]);
      setSelected(generated[0] || null);
      setTab("docs");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка генерации пакета");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-4">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h1 className="text-xl font-semibold">Документы группы — генератор</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {ctx.group.name} · {ctx.students.length} учеников · {ctx.organization.name}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="text-sm flex items-center gap-2">
              Стоимость (₽):
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)}
                className="w-28 rounded-lg border border-border px-2 py-1 text-sm" />
            </label>
            <button onClick={runPackage} disabled={busy}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground disabled:opacity-50">
              ⚡ Сгенерировать весь пакет
            </button>
          </div>
          {error && (
            <div className="mt-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-3 py-2">{error}</div>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={() => setTab("docs")}
            className={`px-3 py-1.5 rounded-xl text-sm ${tab === "docs" ? "bg-primary text-primary-foreground" : "bg-white border border-border"}`}>
            Документы ({docs.length})
          </button>
          <button onClick={() => setTab("vars")}
            className={`px-3 py-1.5 rounded-xl text-sm ${tab === "vars" ? "bg-primary text-primary-foreground" : "bg-white border border-border"}`}>
            Переменные ({Object.keys(previewVars).length})
          </button>
        </div>

        {tab === "vars" && (
          <div className="rounded-2xl border border-border bg-white overflow-hidden">
            <div className="p-4 border-b border-border text-sm text-muted-foreground">
              Значения из org + group + students + company. В шаблоне: <code className="text-xs bg-muted px-1 rounded">{"{{key}}"}</code>
            </div>
            <div className="max-h-[480px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 sticky top-0">
                  <tr>
                    <th className="text-left px-3 py-2">Ключ</th>
                    <th className="text-left px-3 py-2">Название</th>
                    <th className="text-left px-3 py-2">Источник</th>
                    <th className="text-left px-3 py-2">Значение</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {VARIABLE_CATALOG.map((v) => (
                    <tr key={v.key} className="hover:bg-muted/30">
                      <td className="px-3 py-1.5 font-mono text-xs text-primary">{"{{" + v.key + "}}"}</td>
                      <td className="px-3 py-1.5">{v.label}</td>
                      <td className="px-3 py-1.5 text-xs text-muted-foreground">{v.source}</td>
                      <td className="px-3 py-1.5 text-xs max-w-xs truncate">
                        {v.source === "table" ? "[HTML]" : (previewVars[v.key] || "—")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "docs" && (
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-white divide-y divide-border">
              <div className="p-3 text-sm font-medium bg-muted/30">Типы документов</div>
              {templates.map((t) => (
                <div key={t.doc_type} className="p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.hint}</div>
                  </div>
                  <button onClick={() => runOne(t.doc_type)} disabled={busy}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground disabled:opacity-50">
                    Сгенерировать
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-border bg-white">
                <div className="p-3 text-sm font-medium bg-muted/30">Сгенерированные</div>
                {docs.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">Пока пусто</div>
                ) : (
                  <div className="divide-y divide-border max-h-[320px] overflow-auto">
                    {docs.map((d) => (
                      <button key={d.id} onClick={() => setSelected(d)}
                        className={`w-full text-left p-3 hover:bg-muted/40 ${selected?.id === d.id ? "bg-primary/5" : ""}`}>
                        <div className="text-sm font-medium truncate">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{d.document_number} · {d.doc_type}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selected && (
                <div className="rounded-2xl border border-border bg-white p-4 space-y-3">
                  <div className="text-sm font-medium">{selected.name}</div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => previewHtml(selected)} className="px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-muted">
                      👁 Открыть
                    </button>
                    <button onClick={() => downloadHtml(selected)} className="px-3 py-1.5 rounded-lg text-sm border border-border hover:bg-muted">
                      ⬇ Скачать HTML
                    </button>
                  </div>
                  <div className="border border-border rounded-xl overflow-hidden h-[280px]">
                    <iframe title="preview" className="w-full h-full" srcDoc={selected.html} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
