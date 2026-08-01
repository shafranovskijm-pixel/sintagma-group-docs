# sintagma-group-docs

Модуль **«Документы группы»**: переменные, шаблоны, генерация, предпросмотр и скачивание.

## Запуск

```bash
npm install
npm run dev
```

http://localhost:5173

## Что умеет

1. **Переменные** — вкладка «Переменные»: все `{{key}}`, откуда берутся, значения
2. **Генерация** — каждый тип из архива или весь пакет
3. **Предпросмотр** — iframe + новая вкладка
4. **Скачать** — HTML (в Синтагме → PDF)

## Как подставляются переменные

```
GenerationContext (org + group + students + company)
        ↓
buildVariables()  →  Record<string, string>
        ↓
renderTemplate(html, variables)  →  HTML
```

- `src/lib/variables.ts` — каталог и сборка
- `src/lib/templates.ts` — шаблоны
- `src/lib/generate.ts` — генератор
- `src/lib/schema.ts` — схема БД
