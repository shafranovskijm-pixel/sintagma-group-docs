import { useState } from "react";
import { Zap, X, Check, Loader2, FileSignature, Users, Calendar, BookOpen } from "lucide-react";
import type { Student, ContractTemplate, GroupInfo, GeneratedContract } from "@/types";
import { mockGenerateContract } from "@/lib/mockData";

interface Props {
  open: boolean;
  onClose: () => void;
  onGenerated: (contract: GeneratedContract) => void;
  group: GroupInfo;
  students: Student[];
  templates: ContractTemplate[];
}

/** Один экран. Одна кнопка. Всё уже заполнено. */
export function QuickGenerateDialog({
  open, onClose, onGenerated, group, students, templates,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const defaultTemplate = templates.find((t) => t.is_default) || templates[0];
  const today = new Date().toLocaleDateString("ru-RU");
  const canGenerate = students.length > 0 && !!defaultTemplate;

  const handleGenerate = async () => {
    if (!canGenerate || !defaultTemplate) return;
    setBusy(true);
    setError(null);
    try {
      const contract = await mockGenerateContract({ students, template: defaultTemplate, group });
      onGenerated(contract);
      onClose();
    } catch (e: any) {
      setError(e?.message || "Ошибка генерации");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-base">Быстрая генерация договора</h2>
              <p className="text-xs text-muted-foreground">Всё заполнено автоматически</p>
            </div>
          </div>
          <button onClick={onClose} disabled={busy} className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <SummaryRow icon={<FileSignature className="w-4 h-4" />} label="Шаблон">
            {defaultTemplate ? defaultTemplate.name : (
              <span className="text-destructive">Нет шаблона — загрузите шаблон</span>
            )}
          </SummaryRow>
          <SummaryRow icon={<Users className="w-4 h-4" />} label="Ученики">
            {students.length === 0 ? (
              <span className="text-destructive">В группе нет учеников</span>
            ) : (
              <div className="space-y-0.5">
                {students.map((s) => (
                  <div key={s.user_id} className="text-sm">{s.full_name}</div>
                ))}
              </div>
            )}
          </SummaryRow>
          <SummaryRow icon={<BookOpen className="w-4 h-4" />} label="Программа">
            <div className="text-sm">{group.program_title}</div>
            <div className="text-xs text-muted-foreground">{group.hours} ак. ч. · {group.name}</div>
          </SummaryRow>
          <SummaryRow icon={<Calendar className="w-4 h-4" />} label="Дата и номер">
            <div className="text-sm">Дата: {today}</div>
            <div className="text-xs text-muted-foreground">Номер будет присвоен автоматически</div>
          </SummaryRow>
          {error && (
            <div className="rounded-xl bg-destructive/10 text-destructive text-sm px-3 py-2">{error}</div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-border flex items-center justify-end gap-2">
          <button onClick={onClose} disabled={busy} className="px-4 py-2 rounded-xl text-sm hover:bg-muted">Отмена</button>
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || busy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {busy ? (<><Loader2 className="w-4 h-4 animate-spin" /> Генерация…</>) : (<><Check className="w-4 h-4" /> Сгенерировать договор</>)}
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border p-3">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
        <div className="text-sm text-foreground">{children}</div>
      </div>
    </div>
  );
}
