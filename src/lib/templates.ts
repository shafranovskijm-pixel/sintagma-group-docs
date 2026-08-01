/**
 * HTML-шаблоны документов группы.
 * Структура и формулировки взяты из реальных документов
 * ООО «ИЦ «ГОРЭЛТЕХ» (группа 1-ПК-26).
 */

import type { DocType } from "./schema";

export interface DocTemplate {
  doc_type: DocType;
  title: string;
  hint: string;
  body_html: string;
  requiredKeys: string[];
}

const CSS = `
body{font-family:'Times New Roman',Times,serif;font-size:13px;line-height:1.35;color:#000;max-width:820px;margin:20px auto;padding:0 18px}
h1{text-align:center;font-size:15px;margin:12px 0 8px;font-weight:bold}
h2{text-align:center;font-size:14px;margin:10px 0 6px}
.right{text-align:right}.center{text-align:center}
table{border-collapse:collapse;width:100%;margin:10px 0;font-size:12px}
th,td{border:1px solid #333;padding:3px 6px;vertical-align:top}
th{background:#f3f3f3;font-weight:bold;text-align:center}
.no-border td{border:none;padding:2px 4px}
.sig{margin-top:28px}.mt{margin-top:16px}.small{font-size:11px}
p{margin:6px 0}
`;

const PAGE = (body: string) =>
  `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"/><title>Документ</title>` +
  `<style>${CSS}</style></head><body>${body}</body></html>`;

export const TEMPLATES: DocTemplate[] = [
  {
    doc_type: "contract",
    title: "Договор оказания платных образовательных услуг",
    hint: "Договор с заказчиком / обучающимся (по образцу ГОРЭЛТЕХ)",
    requiredKeys: ["org_name", "program_title", "contract_number", "org_director_name"],
    body_html: PAGE(`
<p class="right">г. Санкт-Петербург<br/>{{contract_date_ru}}</p>
<h1>ДОГОВОР<br/>на оказание платных образовательных услуг № {{contract_number}}</h1>
<p><strong>{{org_name}}</strong>, именуемое в дальнейшем «Исполнитель», в лице {{org_director_position}} {{org_director_name}}, действующего на основании Устава, с одной стороны, и <strong>{{company_name}}{{individual_name}}</strong>, именуемое в дальнейшем «Заказчик», с другой стороны, заключили настоящий договор о нижеследующем:</p>
<h2>1. ПРЕДМЕТ ДОГОВОРА</h2>
<p>1.1. Исполнитель обязуется оказать Заказчику и Обучающемуся платные образовательные услуги по ДПО в полном объёме в соответствии с образовательной программой и Правилами оказания платных образовательных услуг (Постановление Правительства РФ от 15.09.2020 № 1441).</p>
<table><thead><tr><th>№</th><th>Программа обучения</th><th>Форма</th><th>Часов</th><th>Человек</th></tr></thead>
<tbody><tr><td class="center">1</td><td>«{{program_title}}»</td><td class="center">{{program_form}}</td><td class="center">{{program_hours}}</td><td class="center">{{students_count}}</td></tr></tbody></table>
<p>1.2. Группа: <strong>{{group_number}}</strong>. Срок: {{start_date}} — {{end_date}}.</p>
<p>1.3. Адрес обучения: {{org_address}}.</p>
<p>1.4. По завершении обучения и итоговой аттестации обучающиеся получают удостоверение о повышении квалификации (ст. 60 ФЗ-273).</p>
<p class="mt"><strong>Список обучающихся:</strong></p>
{{students_table}}
<h2>2. СТОИМОСТЬ И ОПЛАТА</h2>
<p>2.1. Стоимость услуг: <strong>{{total_price}}</strong> руб. ({{total_price_words}}), в т.ч. НДС.</p>
<p>2.2. Оплата на расчётный счёт Исполнителя. Дата оплаты — дата поступления средств.</p>
<h2>3. РЕКВИЗИТЫ И ПОДПИСИ</h2>
<table class="no-border"><tr>
<td width="50%" valign="top"><strong>Исполнитель:</strong><br/>{{org_name}}<br/>ИНН {{org_inn}} / КПП {{org_kpp}}<br/>ОГРН {{org_ogrn}}<br/>{{org_address}}<br/>Р/с {{org_bank_account}} в {{org_bank_name}}<br/>БИК {{org_bank_bik}}<br/>Тел.: {{org_phone}}<br/>E-mail: {{org_email}}<br/>Лицензия: {{org_license}}</td>
<td width="50%" valign="top"><strong>Заказчик:</strong><br/>{{company_name}}{{individual_name}}<br/>{{company_inn}}{{individual_passport}}<br/>{{company_address}}{{individual_address}}<br/>{{company_director}}</td>
</tr></table>
<div class="sig"><table class="no-border"><tr>
<td width="50%"><strong>Исполнитель:</strong><br/><br/>_________ / {{org_director_name}} /</td>
<td width="50%"><strong>Заказчик:</strong><br/><br/>_________ / {{company_director}}{{individual_name}} /</td>
</tr></table></div>
`),
  },
  {
    doc_type: "enrollment_order",
    title: "Приказ об открытии курса и зачислении",
    hint: "Приказ о зачислении слушателей",
    requiredKeys: ["org_name", "group_number", "order_number", "program_title"],
    body_html: PAGE(`
<p class="right">{{org_name}}</p>
<h1>ПРИКАЗ № {{order_number}}</h1>
<p class="center">от {{order_date}}</p>
<p class="center"><strong>Об открытии курса и зачислении на обучение</strong></p>
<p>В соответствии с ФЗ «Об образовании в Российской Федерации», Положением об учебном центре, Уставом {{org_name}} приказываю:</p>
<p><strong>1.</strong> Открыть курс в объёме {{program_hours}} часов по программе повышения квалификации «{{program_title}}» с {{start_date_ru}}.</p>
<p><strong>2.</strong> Зачислить в группу следующих обучающихся:</p>
<table><thead><tr><th>№</th><th>Ф.И.О.</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Основание</th></tr></thead>
<tbody>{{students_list_rows}}</tbody></table>
<p><strong>3.</strong> Присвоить группе номер <strong>{{group_number}}</strong>.</p>
<p><strong>4.</strong> Ответственность за сопровождение курса возложить на {{org_director_name}}.</p>
<p><strong>5.</strong> Контроль за исполнением приказа оставляю за собой.</p>
<div class="sig"><p>Руководитель учебного центра<br/>{{org_name}}</p>
<p>_________________ / {{org_director_name}} /</p>
<p class="small">{{order_date}}</p></div>
`),
  },
  {
    doc_type: "expulsion_order",
    title: "Приказ о закрытии курса и отчислении",
    hint: "Приказ об отчислении / завершении обучения",
    requiredKeys: ["group_number", "order_number", "end_date", "program_title"],
    body_html: PAGE(`
<p class="right">{{org_name}}</p>
<h1>ПРИКАЗ № {{order_number}}</h1>
<p class="center">от {{order_date}}</p>
<p class="center"><strong>О закрытии курса и отчислении обучающихся</strong></p>
<p>На основании результатов итоговой аттестации приказываю:</p>
<p><strong>1.</strong> Закрыть курс по программе «{{program_title}}» ({{program_hours}} ак. ч.) с {{end_date_ru}}.</p>
<p><strong>2.</strong> Отчислить с выдачей удостоверений обучающихся группы <strong>{{group_number}}</strong>:</p>
<table><thead><tr><th>№</th><th>Ф.И.О.</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Основание</th></tr></thead>
<tbody>{{students_list_rows}}</tbody></table>
<p><strong>3.</strong> Контроль за исполнением приказа оставляю за собой.</p>
<div class="sig"><p>Руководитель учебного центра<br/>{{org_name}}</p>
<p>_________________ / {{org_director_name}} /</p>
<p class="small">{{order_date}}</p></div>
`),
  },
  {
    doc_type: "student_list",
    title: "Список обучающихся",
    hint: "Поимённый список слушателей группы",
    requiredKeys: ["group_number", "students_list_rows"],
    body_html: PAGE(`
<h1>СПИСОК ОБУЧАЮЩИХСЯ</h1>
<p class="center">Группа № <strong>{{group_number}}</strong></p>
<p class="center">Курса «{{program_title}}»</p>
<p class="center">{{start_date}} — {{end_date}} · {{program_hours}} ак. ч.</p>
<table><thead><tr><th>№</th><th>Фамилия Имя Отчество</th><th>Программа</th><th>Часов</th><th>Срок</th><th>Примечание</th></tr></thead>
<tbody>{{students_list_rows}}</tbody></table>
<div class="sig"><p>Руководитель учебного центра</p>
<p>_________________ / {{org_director_name}} /</p></div>
`),
  },
  {
    doc_type: "schedule",
    title: "Расписание учебных занятий",
    hint: "Расписание занятий группы",
    requiredKeys: ["program_title", "start_date", "end_date", "group_number"],
    body_html: PAGE(`
<h1>Расписание учебных занятий</h1>
<p class="center"><strong>«{{program_title}}»</strong></p>
<p class="center">{{program_hours}} ак. ч. · Группа {{group_number}}</p>
<p class="center">Срок: {{start_date}} — {{end_date}}</p>
<table><thead><tr><th>Дата</th><th>Время</th><th>Тема / модуль</th><th>Часов</th><th>Преподаватель</th></tr></thead>
<tbody>
<tr><td class="center">{{start_date}}</td><td class="center">09:00–18:00</td><td>Вводный модуль. Нормативная база</td><td class="center">8</td><td>{{org_director_name}}</td></tr>
<tr><td class="center">—</td><td class="center">09:00–18:00</td><td>Проектирование электроустановок</td><td class="center">8</td><td>{{org_director_name}}</td></tr>
<tr><td class="center">—</td><td class="center">09:00–18:00</td><td>Монтаж, испытания, документация</td><td class="center">8</td><td>{{org_director_name}}</td></tr>
<tr><td class="center">{{end_date}}</td><td class="center">09:00–18:00</td><td>Практика. Итоговая аттестация</td><td class="center">8</td><td>{{org_director_name}}</td></tr>
</tbody></table>
<div class="sig"><p>Преподаватель: _________________ / {{org_director_name}} /</p>
<p>Руководитель: _________________ / {{org_director_name}} /</p></div>
`),
  },
  {
    doc_type: "class_journal",
    title: "Журнал учёта занятий",
    hint: "Журнал учёта занятий и посещаемости",
    requiredKeys: ["group_number", "program_title", "journal_rows"],
    body_html: PAGE(`
<h1>Журнал учёта занятий</h1>
<p class="center">Группа № <strong>{{group_number}}</strong></p>
<p class="center">«{{program_title}}»</p>
<p class="center">{{program_hours}} ак. ч. · {{start_date}} — {{end_date}}</p>
<table><thead><tr><th>№</th><th>Фамилия Имя Отчество</th><th>{{start_date}}</th><th>День 2</th><th>День 3</th><th>{{end_date}}</th></tr></thead>
<tbody>{{journal_rows}}</tbody></table>
<p class="small">Отметка «V» — присутствие.</p>
<div class="sig"><p>Преподаватель: _________________ / {{org_director_name}} /</p>
<p>Руководитель: _________________ / {{org_director_name}} /</p></div>
`),
  },
  {
    doc_type: "attestation_sheet",
    title: "Ведомость итоговой аттестации",
    hint: "Итоговая ведомость результатов аттестации",
    requiredKeys: ["group_number", "program_title", "end_date", "attestation_rows"],
    body_html: PAGE(`
<h1>ВЕДОМОСТЬ итоговой аттестации</h1>
<p class="center">Дата {{end_date}} &nbsp;&nbsp; № {{group_number}}/ИА</p>
<p class="center">Программа «{{program_title}}»</p>
<p class="center">Группа <strong>{{group_number}}</strong> · {{program_hours}} час. · {{start_date}} — {{end_date}}</p>
<p class="center">Вид аттестации: <strong>Экзамен</strong></p>
<table><thead><tr><th>№</th><th>Фамилия, имя, отчество</th><th>Процент баллов</th><th>Оценка</th></tr></thead>
<tbody>{{attestation_rows}}</tbody></table>
<div class="sig"><p>Преподаватель _____________ / {{org_director_name}} /</p>
<p>Руководитель _____________ / {{org_director_name}} /</p></div>
`),
  },
  {
    doc_type: "registration_book",
    title: "Книга регистрации выдачи документов",
    hint: "Книга регистрации (данные для ФРДО)",
    requiredKeys: ["org_name", "registration_rows"],
    body_html: PAGE(`
<h1>Книга регистрации выдачи документов о квалификации</h1>
<p class="center">{{org_name}}</p>
<p class="center small">Данные для ФИС ФРДО</p>
<table style="font-size:10px"><thead><tr>
<th>№</th><th>Вид документа</th><th>Программа / группа</th><th>Серия</th><th>Номер</th>
<th>ФИО</th><th>Дата рожд.</th><th>Пол</th><th>Паспорт</th><th>Гражданство</th>
<th>Приказ</th><th>Дата выдачи</th><th>Подп. рук.</th><th>Получил</th><th>Дов.</th><th>Утрата</th>
</tr></thead><tbody>{{registration_rows}}</tbody></table>
<div class="sig"><p>Ответственный: _________________ / {{org_director_name}} /</p></div>
`),
  },
  {
    doc_type: "title_page",
    title: "Титульный лист группы",
    hint: "Титульный лист дела группы",
    requiredKeys: ["org_name", "group_number", "program_title"],
    body_html: PAGE(`
<div style="margin-top:60px" class="center">
<p>Учебный центр</p>
<p><strong>{{org_name}}</strong></p>
<h1 style="margin-top:50px;font-size:18px">ДЕЛО</h1>
<p style="margin-top:12px">группы слушателей курсов<br/>дополнительного профессионального образования</p>
<h2 style="margin-top:24px;font-size:20px">№ {{group_number}}</h2>
<p style="margin-top:36px">По программе:</p>
<p><strong>«{{program_title}}»</strong></p>
<p>{{program_hours}} академических часов</p>
<p style="margin-top:28px">Сроки: с {{start_date}} по {{end_date}}</p>
<p>Обучающихся: {{students_count}}</p>
<p style="margin-top:60px">г. Санкт-Петербург<br/>{{year}} г.</p>
</div>
`),
  },
  {
    doc_type: "pass",
    title: "Пропуск",
    hint: "Пропуск на обучение",
    requiredKeys: ["individual_name", "group_number", "program_title"],
    body_html: PAGE(`
<div class="center" style="border:2px solid #333;padding:28px;max-width:420px;margin:40px auto">
<p>{{org_name}}</p>
<h1 style="margin:16px 0">ПРОПУСК</h1>
<p>на обучение</p>
<p style="margin-top:12px"><strong>«{{program_title}}»</strong></p>
<p>{{program_hours}} ак. ч.</p>
<p style="margin-top:14px">Группа: <strong>{{group_number}}</strong></p>
<p style="margin-top:18px;font-size:16px"><strong>{{individual_name}}</strong></p>
<p>{{start_date}} — {{end_date}}</p>
<p style="margin-top:28px">М.П. &nbsp;&nbsp; _____________ / {{org_director_name}} /</p>
</div>
`),
  },
];

export function getTemplate(docType: DocType): DocTemplate | undefined {
  return TEMPLATES.find((t) => t.doc_type === docType);
}

export function getAllTemplates(): DocTemplate[] {
  return TEMPLATES;
}
