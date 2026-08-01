import { useState } from "react";
import type { Student, ContractTemplate, GroupInfo, GeneratedContract } from "../types";
import { ContractsFolder } from "./ContractsFolder";

type FolderKey = "contracts" | "passports" | "snils" | "exams" | "docs";

const TITLES: Record<FolderKey, string> = {
  contracts: "Договоры",
  passports: "Паспорта",
  snils: "СНИЛС",
  exams: "Экзамены",
  docs: "Документы группы",
};

interface Props {
  group: GroupInfo;
  students: Student[];
  templates: ContractTemplate[];
  contracts: GeneratedContract[];
  onContractsChange: (next: GeneratedContract[]) => void;
  onBack?: () => void;
}

export function GroupFolderView({
  group, students, templates, contracts, onContractsChange, onBack,
}: Props) {
  const [openFolder, setOpenFolder] = useState<FolderKey | null>(null);

  const folders: { key: FolderKey; count: number }[] = [
    { key: "contracts", count: contracts.length },
    { key: "passports", count: 0 },
    { key: "snils", count: 0 },
    { key: "exams", count: 0 },
    { key: "docs", count: 0 },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <button type="button" onClick={onBack} className="hover:underline">Назад</button>
        <span className="text-slate-400">/</span>
        <span className="font-medium">{group.name}</span>
        {openFolder && (
          <>
            <span className="text-slate-400">/</span>
            <span className="font-medium">{TITLES[openFolder]}</span>
          </>
        )}
      </div>

      {!openFolder && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {folders.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setOpenFolder(f.key)}
              className="p-4 rounded-xl border border-slate-200 bg-white text-left hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="text-2xl mb-2">📁</div>
              <div className="text-sm font-medium">{TITLES[f.key]}</div>
              <div className="text-xs text-slate-500 mt-1">{f.count} файл(ов)</div>
            </button>
          ))}
        </div>
      )}

      {openFolder === "contracts" && (
        <div>
          <button type="button" onClick={() => setOpenFolder(null)} className="text-xs mb-2 hover:underline">
            ← К папкам
          </button>
          <ContractsFolder
            group={group}
            students={students}
            templates={templates}
            contracts={contracts}
            onContractsChange={onContractsChange}
          />
        </div>
      )}

      {openFolder && openFolder !== "contracts" && (
        <div className="rounded-xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
          <button type="button" onClick={() => setOpenFolder(null)} className="text-xs mb-4 hover:underline block mx-auto">
            ← К папкам
          </button>
          Папка «{TITLES[openFolder]}» — в разработке
        </div>
      )}
    </div>
  );
}
