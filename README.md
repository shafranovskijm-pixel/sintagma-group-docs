# sintagma-group-docs

Модуль **«Документы группы»** по реальным шаблонам ООО «ИЦ «ГОРЭЛТЕХ».

## Запуск

```bash
npm install
npm run dev
```

Или откройте `demo.html` в браузере (без сборки).

## Алгоритм заполнения

```
GenerationContext (organization + group + students + company)
        │
        ▼
buildVariables(ctx, { documentNumber, totalPrice, … })
        │  • даты обучения → day1..day4
        │  • заказчик = company ИЛИ физлицо
        │  • таблицы: students / journal / attestation / FRDO / pass
        │  • номера: договор 2026-101, приказы УЦ-102/2026
        ▼
Record<string, string>  ({{org_name}}, {{students_table}}, …)
        │
        ▼
renderTemplate(html, variables)  →  HTML
        │
        ▼
preview / download  (в Синтагме → html-to-pdf)
```

## Документы (10 типов из архива клиента)

| key | Документ |
|-----|----------|
| contract | Договор (предмет, стоимость, реквизиты, приложение со списком) |
| enrollment_order | Приказ об открытии и зачислении (УЦ-N/YYYY) |
| expulsion_order | Приказ о закрытии и отчислении |
| student_list | Список: ФИО, e-mail, паспорт серия/номер, образование |
| class_journal | Журнал с датами занятий |
| schedule | Расписание 4 дней |
| attestation_sheet | Итоговая ведомость |
| registration_book | Книга регистрации (ФРДО) |
| title_page | Титульный лист «ДЕЛО» |
| pass | Список на даты занятий |

## Источник шаблонов

Архив `для сайта (1).zip` — реальные документы группы 1-ПК-26.
