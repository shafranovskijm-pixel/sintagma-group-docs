import { useState } from "react";
import { Zap, FileSignature, Download, Trash2, Upload } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type { Student, ContractTemplate, GroupInfo, GeneratedContract } from "../types";
import { QuickGenerateDialog } from "./QuickGenerateDialog";

interface Props {
  group: GroupInfo;
  students: Student[];
  templates: ContractTemplate[];
  contracts: GeneratedContract[];
  onContractsChange: (next: GeneratedContract[]) => void;
}

export function ContractsFolder({
  group, students, templates, contracts, onContractsChange,
}: Props) {
  const [quickOpen, setQuickOpen] = useState(false);

  const handleGenerated = (c: GeneratedContract) => {
    onContractsChange([c, ...contracts]);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Удалить договор?")) return;
    onContractsChange(contracts.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setQuickOpen(true)}
          disabled={students.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 shadow-sm"
        >
          <Zap className="w-4 h-4" />
          Быстрая генерация
        </button>
        <button disabled className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border border-border text-muted-foreground opacity-60 cursor-not-allowed">
          <FileSignature className="w-4 h-4" /> Расширенный режим
        </button>
        <button disabled className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border border-border text-muted-foreground opacity-60 cursor-not-allowed">
          <Upload className="w-4 h-4" /> Загрузить
        </button>
      </div>

      {students.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          В группе нет учеников — добавьте учеников, чтобы сгенерировать договор.
        </div>
      )}

      {contracts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <FileSignature className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-sm font-medium text-foreground mb-1">Договоров пока нет</p>
          <p className="text-xs text-muted-foreground mb-4">Нажмите «Быстрая генерация»</p>
          <button onClick={() => setQuickOpen(true)} disabled={students.length === 0} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-primary text-primary-foreground disabled:opacity-50">
            <Zap className="w-4 h-4" /> Быстрая генерация
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">№</th>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Ученики</th>
                <th className="px-4 py-3 font-medium">Дата</th>
                <th className="px-4 py-3 font-medium text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contracts.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{c.contract_number}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.student_names.join(", ")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{format(new Date(c.contract_date), "d MMM yyyy", { locale: ru })}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-1">
                      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:bg-muted">
                        <Download className="w-3.5 h-3.5" /> Открыть
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <QuickGenerateDialog
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        onGenerated={handleGenerated}
        group={group}
        students={students}
        templates={templates}
      />
    </div>
  );
}
