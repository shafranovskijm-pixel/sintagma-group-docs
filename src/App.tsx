import { useState } from "react";
import { GroupFolderView } from "./components/GroupFolderView";
import { MOCK_GROUP, MOCK_STUDENTS, MOCK_TEMPLATES } from "./lib/mockData";
import type { GeneratedContract } from "./types";

/**
 * Демо-приложение.
 * Показывает Windows-подобный интерфейс папок группы
 * и рабочую «Быструю генерацию» договора на мок-данных.
 */
export default function App() {
  const [contracts, setContracts] = useState<GeneratedContract[]>([]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto mb-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong>Прототип модуля «Документы группы»</strong>
          <span className="text-amber-800">
            {" "}&mdash; отдельные компоненты для безопасной интеграции в Синтагму.
            Данные моковые. Нажмите папку «Договоры» → «Быстрая генерация».
          </span>
        </div>
      </div>

      <GroupFolderView
        group={MOCK_GROUP}
        students={MOCK_STUDENTS}
        templates={MOCK_TEMPLATES}
        contracts={contracts}
        onContractsChange={setContracts}
      />
    </div>
  );
}
