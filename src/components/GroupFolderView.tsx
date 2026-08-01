import { useState } from "react";
import {
  Folder, FileText, FileSignature, IdCard, GraduationCap,
  ArrowLeft, Users, Calendar, LayoutGrid, List, Table as TableIcon,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { getGroupDocumentTypes, GROUP_DOCUMENT_TYPE_MAP } from "../lib/groupDocuments";
import type { Student, ContractTemplate, GroupInfo, GeneratedContract } from "../types";
import { ContractsFolder } from "./ContractsFolder";

type FolderKey = "contracts" | "passports" | "snils" | "exams" | "docs";
type ViewMode = "grid" | "list" | "table";

const FOLDER_META: Record<FolderKey, { title: string; icon: any; hint: string }> = {
  contracts: {
    title: GROUP_DOCUMENT_TYPE_MAP.contract.title,
    icon: FileSignature,
    hint: GROUP_DOCUMENT_TYPE_MAP.contract.hint || "",
  },
  passports: { title: "Паспорта", icon: IdCard, hint: "Сканы паспортов учеников" },
  snils: { title: "СНИЛС", icon: IdCard, hint: "Сканы СНИЛС учеников" },
  exams: { title: "Экзамены", icon: GraduationCap, hint: "Попытки и результаты аттестации" },
  docs: { title: "Документы группы", icon: FileText, hint: "Приказы, журналы, ведомости" },
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
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const folderCards: { key: FolderKey; count: number }[] = [
    { key: "contracts", count: contracts.length },
    { key: "passports", count: 0 },
    { key: "snils", count: 0 },
    { key: "exams", count: 0 },
    { key: "docs", count: 0 },
  ];

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <button className="hover:text-foreground" onClick={onBack}>Ученики</button>
        <span>/</span>
        <span>Группы</span>
        <span>/</span>
        <span className="text-foreground font-medium">{group.name}</span>
        {openFolder && (<><span>/</span><span className="text-foreground font-medium">{FOLDER_META[openFolder].title}</span></>)}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: (group.color || "#6366f1") + "22", color: group.color || "#6366f1" }}>
              <Folder className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold truncate">{group.name}</h1>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <span className="inline-flex items-center gap-1"><Users className="w-4 h-4" />{students.length} учеников</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(group.start_date), "dd.MM.yyyy", { locale: ru })}
                  {" — "}
                  {format(new Date(group.end_date), "dd.MM.yyyy", { locale: ru })}
                </span>
              </div>
            </div>
          </div>
          <button onClick={() => (openFolder ? setOpenFolder(null) : onBack?.())} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm hover:bg-muted">
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="text-xs text-muted-foreground">{openFolder ? FOLDER_META[openFolder].title : "Все папки"}</div>
        <div className="inline-flex rounded-xl border border-border p-0.5">
          {([["grid", LayoutGrid], ["list", List], ["table", TableIcon]] as const).map(([mode, Icon]) => (
            <button key={mode} onClick={() => setViewMode(mode)} className={`h-8 w-8 rounded-lg flex items-center justify-center ${viewMode === mode ? "bg-muted" : "hover:bg-muted/50"}`}>
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {!openFolder ? (
        <FolderList folders={folderCards} viewMode={viewMode} onOpen={setOpenFolder} />
      ) : openFolder === "contracts" ? (
        <ContractsFolder group={group} students={students} templates={templates} contracts={contracts} onContractsChange={onContractsChange} />
      ) : openFolder === "docs" ? (
        <DocsFolderPlaceholder />
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Папка «{FOLDER_META[openFolder].title}» — в разработке
        </div>
      )}
    </div>
  );
}

function FolderList({ folders, viewMode, onOpen }: { folders: { key: FolderKey; count: number }[]; viewMode: ViewMode; onOpen: (k: FolderKey) => void }) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {folders.map(({ key, count }) => {
          const meta = FOLDER_META[key];
          const Icon = meta.icon;
          return (
            <button key={key} onClick={() => onOpen(key)} className="text-left p-4 rounded-2xl border border-border bg-card hover:shadow-sm hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3"><Icon className="w-5 h-5" /></div>
              <div className="font-medium text-sm truncate">{meta.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{meta.hint}</div>
              <div className="mt-2 text-xs text-muted-foreground">{count} файл(ов)</div>
            </button>
          );
        })}
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border divide-y divide-border bg-card">
      {folders.map(({ key, count }) => {
        const meta = FOLDER_META[key];
        const Icon = meta.icon;
        return (
          <button key={key} onClick={() => onOpen(key)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><Icon className="w-4 h-4" /></div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{meta.title}</div>
              <div className="text-xs text-muted-foreground truncate">{meta.hint}</div>
            </div>
            <div className="text-xs text-muted-foreground shrink-0">{count} файл(ов)</div>
          </button>
        );
      })}
    </div>
  );
}

function DocsFolderPlaceholder() {
  const types = getGroupDocumentTypes("docs");
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium">Автогенерация пакета документов группы</p>
          <p className="text-muted-foreground text-xs mt-1">Фундамент готов. Типы документов описаны.</p>
        </div>
      </div>
      <div className="rounded-2xl border border-border divide-y divide-border bg-card">
        {types.map((t) => (
          <div key={t.key} className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <div className="font-medium text-sm">{t.title}</div>
              {t.hint && <div className="text-xs text-muted-foreground mt-0.5">{t.hint}</div>}
            </div>
            <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-muted text-muted-foreground shrink-0">
              {t.status === "ready" ? "Готово" : "Скоро"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
