# sintagma-group-docs

Отдельный модуль **«Документы группы»** для платформы [Синтагма](https://github.com/shafranovskijm-pixel/synthagma-ver-0.1).

Цель: сделать Windows-подобный интерфейс папок + **быструю генерацию договора одной кнопкой**, не ломая основной код Синтагмы. После проверки UX — встраиваем компоненты обратно.

## Что внутри

| Файл | Назначение |
|------|------------|
| `src/lib/groupDocuments.ts` | Фундамент: реестр всех типов документов группы |
| `src/components/GroupFolderView.tsx` | Windows-like папки группы |
| `src/components/ContractsFolder.tsx` | Папка «Договоры» + кнопка «Быстрая генерация» |
| `src/components/QuickGenerateDialog.tsx` | Один экран, одна кнопка |
| `src/lib/mockData.ts` | Мок-данные + симуляция генерации |

## Как запустить

```bash
npm install
npm run dev
```

1. Откройте папку **«Договоры»**
2. Нажмите **⚡ Быстрая генерация**
3. Подтвердите — договор появится в таблице

## Интеграция в Синтагму

1. Скопировать `groupDocuments.ts` в `src/lib/`
2. Заменить mock на реальный html-to-pdf + org_contracts
3. Взять UX из ContractsFolder + QuickGenerateDialog

Репозиторий: https://github.com/shafranovskijm-pixel/sintagma-group-docs
