# Интеграция «Документы группы» в Синтагму

## Что это
Модуль генерации 10 документов ДПО по шаблонам ООО «ИЦ «ГОРЭЛТЕХ».
Алгоритм: `GenerationContext → buildVariables → renderTemplate → HTML`.

## Файлы → куда в Синтагме

```
group-docs-module/lib/
  schema.ts            → src/lib/group-docs/schema.ts
  variables.ts         → src/lib/group-docs/variables.ts
  variableCatalog.ts   → src/lib/group-docs/variableCatalog.ts
  templates.ts         → src/lib/group-docs/templates.ts
  contractBody.ts      → src/lib/group-docs/contractBody.ts   # дословный договор
  generate.ts          → src/lib/group-docs/generate.ts
  groupDocuments.ts    → src/lib/group-docs/groupDocuments.ts
  sampleContext.ts     → src/lib/group-docs/sampleContext.ts  # только для тестов

group-docs-module/components/
  GroupFolderView.tsx  → src/components/organization/tabs/group-folder/GroupFolderView.tsx
```

Импорты внутри модуля: `from "../lib/..."` → в Синтагме поправить на `@/lib/group-docs/...`.

## Вызов из GroupFolderTab

```tsx
import { GroupFolderView } from "./group-folder/GroupFolderView";
import type { GenerationContext } from "@/lib/group-docs/schema";

const ctx: GenerationContext = {
  organization: { name, inn, kpp, ogrn, address, director_name, director_position },
  group: { id, name, number, start_date, end_date, program_title, program_hours, program_form },
  students: students.map(s => ({ user_id: s.id, full_name: s.full_name, ... })),
  company: selectedCompany || undefined,
};

<GroupFolderView
  ctx={ctx}
  totalPrice={contractPrice}
  onGenerated={(docs) => {
    // сохранить в Supabase group_documents
  }}
/>
```

## Минимальный API

```ts
import { generateDocument, generatePackage } from "@/lib/group-docs/generate";

const doc = generateDocument(ctx, "contract", { totalPrice: 45000 });
const pack = generatePackage(ctx, [
  "contract","enrollment_order","expulsion_order","student_list",
  "class_journal","schedule","attestation_sheet","registration_book",
  "title_page","pass"
], { totalPrice: 45000 });
```

## SQL (Supabase)

```sql
create table if not exists group_documents (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  doc_type text not null,
  name text not null,
  document_number text,
  document_date date,
  variables jsonb not null default '{}',
  file_path text,
  html text,
  status text default 'active',
  created_at timestamptz default now()
);
```

## Зависимости
Только React. Не добавлять lucide-react / date-fns.

## Проверка (2026-08-01)
Все 10 типов: unfilled variables = 0. Договор ~31KB HTML, разделы 1–12.
