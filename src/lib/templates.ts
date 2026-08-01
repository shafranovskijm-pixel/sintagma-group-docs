import type { DocType } from "./schema";

export interface DocTemplate {
  doc_type: DocType;
  title: string;
  hint: string;
  body_html: string;
  requiredKeys: string[];
}

const PAGE = (body: string) =>
  `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"/>` +
  `<style>body{font-family:'Times New Roman',Times,serif;font-size:14px;line-height:1.35;color:#000;max-width:800px;margin:24px auto;padding:0 16px}` +
  `h1,h2{text-align:center;font-size:16px}.right{text-align:right}.center{text-align:center}` +
  `table{border-collapse:collapse;width:100%;margin:12px 0}th,td{border:1px solid #333;padding:4px 8px;vertical-align:top}` +
  `.no-border td{border:none;padding:2px 4px}.sig{margin-top:36px}</style></head><body>${body}</body></html>`;

export const TEMPLATES: DocTemplate[] = [
  {
    doc_type: "contract",
    title: "Договор оказания платных образовательных услуг",
    hint: "Договор с заказчиком / обучающимся",
    requiredKeys: ["org_name", "program_title", "contract_number"],
    body_html: PAGE(`
      <p class="right">г. Санкт-Петербург<br/>{{contract_date_ru}}</p>
      <h1>ДОГОВОР<br/>на оказание платных образовательных услуг № {{contract_number}}</h1>
      <p><strong>{{org_name}}</strong> («Исполнитель»), в лице {{org_director_position}} {{org_director_name}},
      и <strong>{{company_name}}{{individual_name}}</strong> («Заказчик»), заключили договор:</p>
      <h2>1. ПРЕДМЕТ ДОГОВОРА</h2>
      <p>1.1. Программа <strong>«{{program_title}}»</strong> ({{program_hours}} ак. ч., {{program_form}}),
      группа <strong>{{group_number}}</strong>, срок: {{start_date}} — {{end_date}}.</p>
      <p>1.2. Обучающихся: <strong>{{students_count}}</strong>.</p>
      <p>{{students_table}}</p>
      <h2>2. СТОИМОСТЬ</h2>
      <p>2.1. <strong>{{total_price}}</strong> руб. ({{total_price_words}}).</p>
      <h2>3. РЕКВИЗИТЫ</h2>
      <p>{{org_name}}<br/>ИНН {{org_inn}}, КПП {{org_kpp}}, ОГРН {{org_ogrn}}<br/>
      {{org_address}}<br/>Р/с {{org_bank_account}} в {{org_bank_name}}, БИК {{org_bank_bik}}</p>
      <div class="sig"><table class="no-border"><tr>
        <td width="50%"><strong>Исполнитель:</strong><br/>_________ / {{org_director_name}} /</td>
        <td width="50%"><strong>Заказчик:</strong><br/>_________ / {{company_director}}{{individual_name}} /</td>
      </tr></table></div>`),
  },
  {
    doc_type: "enrollment_order",
    title: "Приказ об открытии курса и зачислении",
    hint: "Приказ о зачислении",
    requiredKeys: ["org_name", "group_number", "order_number"],
    body_html: PAGE(`
      <p class="right">{{org_name}}</p>
      <h1>ПРИКАЗ № {{order_number}} от {{order_date}}</h1>
      <p class="center"><strong>Об открытии курса и зачислении на обучение</strong></p>
      <p>1. Открыть курс {{program_hours}} ч. «{{program_title}}» с {{start_date_ru}}.</p>
      <p>2. Зачислить в группу:</p>
      <table><thead><tr><th>№</th><th>ФИО</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Основание</th></tr></thead>
      <tbody>{{students_list_rows}}</tbody></table>
      <p>3. Присвоить группе номер <strong>{{group_number}}</strong>.</p>
      <div class="sig"><p>Руководитель {{org_name}}</p>
      <p>_________ / {{org_director_name}} /</p></div>`),
  },
  {
    doc_type: "expulsion_order",
    title: "Приказ о закрытии курса и отчислении",
    hint: "Приказ об отчислении",
    requiredKeys: ["group_number", "order_number", "end_date"],
    body_html: PAGE(`
      <p class="right">{{org_name}}</p>
      <h1>ПРИКАЗ № {{order_number}} от {{order_date}}</h1>
      <p class="center"><strong>О закрытии курса и отчислении</strong></p>
      <p>1. Закрыть курс «{{program_title}}» с {{end_date_ru}}.</p>
      <p>2. Отчислить с выдачей удостоверений из группы <strong>{{group_number}}</strong>:</p>
      <table><thead><tr><th>№</th><th>ФИО</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Основание</th></tr></thead>
      <tbody>{{students_list_rows}}</tbody></table>
      <div class="sig"><p>_________ / {{org_director_name}} /</p></div>`),
  },
  {
    doc_type: "student_list",
    title: "Список обучающихся",
    hint: "Поимённый список",
    requiredKeys: ["group_number", "students_list_rows"],
    body_html: PAGE(`
      <h1>СПИСОК ОБУЧАЮЩИХСЯ</h1>
      <p class="center">Группа <strong>{{group_number}}</strong> · {{program_title}}</p>
      <p class="center">{{start_date}} — {{end_date}} · {{program_hours}} ак. ч.</p>
      <table><thead><tr><th>№</th><th>ФИО</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Примечание</th></tr></thead>
      <tbody>{{students_list_rows}}</tbody></table>
      <div class="sig"><p>_________ / {{org_director_name}} /</p></div>`),
  },
  {
    doc_type: "schedule",
    title: "Расписание учебных занятий",
    hint: "Расписание",
    requiredKeys: ["program_title", "start_date", "end_date"],
    body_html: PAGE(`
      <h1>Расписание учебных занятий</h1>
      <p class="center"><strong>«{{program_title}}»</strong></p>
      <p class="center">{{program_hours}} ак. ч. · Группа {{group_number}}</p>
      <table><thead><tr>
        <th>{{start_date}}<br/>09.00–18.00</th><th>День 2</th><th>День 3</th><th>{{end_date}}</th>
      </tr></thead><tbody><tr>
        <td>Нормативная документация</td><td>Классификация зон</td>
        <td>Кабельные линии</td><td>Итоговая аттестация</td>
      </tr></tbody></table>
      <div class="sig"><p>Преподаватель _________</p>
      <p>Руководитель {{org_director_name}} _________</p></div>`),
  },
  {
    doc_type: "class_journal",
    title: "Журнал учёта занятий",
    hint: "Журнал посещаемости",
    requiredKeys: ["group_number", "students_table"],
    body_html: PAGE(`
      <h1>Журнал учёта занятий</h1>
      <p>Группа: <strong>{{group_number}}</strong> · {{program_title}}</p>
      <p>{{start_date}} — {{end_date}}</p>
      <h2>Состав группы</h2>{{students_table}}
      <h2>Учёт занятий</h2>
      <table><thead><tr><th>Дата</th><th>Тема</th><th>Часов</th><th>Подпись</th></tr></thead>
      <tbody>
        <tr><td>{{start_date}}</td><td>Нормативная документация</td><td>8</td><td></td></tr>
        <tr><td></td><td>Классификация зон</td><td>8</td><td></td></tr>
        <tr><td></td><td>Кабельные линии</td><td>8</td><td></td></tr>
        <tr><td>{{end_date}}</td><td>Итоговая аттестация</td><td>8</td><td></td></tr>
      </tbody></table>`),
  },
  {
    doc_type: "attestation_sheet",
    title: "Итоговая ведомость аттестации",
    hint: "Результаты аттестации",
    requiredKeys: ["group_number", "students_list_rows"],
    body_html: PAGE(`
      <h1>Итоговая ведомость аттестации</h1>
      <p class="center">Группа {{group_number}} · «{{program_title}}» · {{end_date}}</p>
      <table><thead><tr><th>№</th><th>ФИО</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Результат</th></tr></thead>
      <tbody>{{students_list_rows}}</tbody></table>
      <div class="sig"><p>Председатель _________</p>
      <p>Руководитель {{org_director_name}} _________</p></div>`),
  },
  {
    doc_type: "registration_book",
    title: "Книга регистрации выдачи документов",
    hint: "Реестр для ФРДО",
    requiredKeys: ["org_name", "registration_rows"],
    body_html: PAGE(`
      <h1>Книга регистрации выдачи документов о квалификации</h1>
      <p class="center">{{org_name}}</p>
      <table style="font-size:10px"><thead><tr>
        <th>№</th><th>Документ</th><th>Программа</th><th>Рег.№</th><th>Бланк</th><th>ФИО</th>
        <th>Год р.</th><th>Пол</th><th>Паспорт</th><th>Гражд.</th><th>Приказ</th>
        <th>Подп. рук.</th><th>Получ.</th><th>Дов.</th><th>Утрата</th><th>Дубл.</th>
      </tr></thead><tbody>{{registration_rows}}</tbody></table>`),
  },
  {
    doc_type: "title_page",
    title: "Титульный лист группы",
    hint: "Титульный лист",
    requiredKeys: ["org_name", "group_number"],
    body_html: PAGE(`
      <div style="margin-top:80px" class="center">
        <p>{{org_name}}</p>
        <h1 style="margin-top:60px">УЧЕБНАЯ ГРУППА</h1>
        <h2>{{group_number}}</h2>
        <p style="margin-top:40px">Программа повышения квалификации</p>
        <p><strong>«{{program_title}}»</strong></p>
        <p>{{program_hours}} ак. ч.</p>
        <p style="margin-top:40px">{{start_date}} — {{end_date}}</p>
        <p>Обучающихся: {{students_count}}</p>
        <p style="margin-top:80px">{{year}} г.</p>
      </div>`),
  },
  {
    doc_type: "pass",
    title: "Пропуск",
    hint: "Пропуск на обучение",
    requiredKeys: ["individual_name", "group_number"],
    body_html: PAGE(`
      <div class="center" style="border:2px solid #333;padding:24px;max-width:400px;margin:40px auto">
        <p>{{org_name}}</p>
        <h1>ПРОПУСК</h1>
        <p>На обучение</p>
        <p><strong>«{{program_title}}»</strong></p>
        <p>Группа: <strong>{{group_number}}</strong></p>
        <p style="margin-top:20px;font-size:16px"><strong>{{individual_name}}</strong></p>
        <p>{{start_date}} — {{end_date}}</p>
        <p style="margin-top:24px">М.П. ____ / {{org_director_name}} /</p>
      </div>`),
  },
];

export function getTemplate(docType: DocType): DocTemplate | undefined {
  return TEMPLATES.find((t) => t.doc_type === docType);
}

export function getAllTemplates(): DocTemplate[] {
  return TEMPLATES;
}
