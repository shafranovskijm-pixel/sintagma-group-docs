import type { GenerationContext } from "./schema";
import { VARIABLE_CATALOG } from "./variableCatalog";
export { VARIABLE_CATALOG } from "./variableCatalog";

const MONTHS_RU = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export function formatDateRu(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `«${String(d.getDate()).padStart(2, "0")}» ${MONTHS_RU[d.getMonth()]} ${d.getFullYear()} г.`;
}

export function formatDateShort(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ru-RU");
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildStudentsTable(students: GenerationContext["students"]): string {
  if (!students.length) return "<p>Нет обучающихся</p>";
  const rows = students
    .map(
      (s, i) =>
        `<tr><td style="border:1px solid #333;padding:4px 8px;text-align:center">${i + 1}</td>` +
        `<td style="border:1px solid #333;padding:4px 8px">${esc(s.full_name)}</td>` +
        `<td style="border:1px solid #333;padding:4px 8px">${esc(s.passport || "—")}</td>` +
        `<td style="border:1px solid #333;padding:4px 8px">${esc(s.snils || "—")}</td></tr>`
    )
    .join("");
  return (
    `<table style="border-collapse:collapse;width:100%;font-size:12px"><thead><tr>` +
    `<th style="border:1px solid #333;padding:4px 8px">№</th>` +
    `<th style="border:1px solid #333;padding:4px 8px">ФИО</th>` +
    `<th style="border:1px solid #333;padding:4px 8px">Паспорт</th>` +
    `<th style="border:1px solid #333;padding:4px 8px">СНИЛС</th>` +
    `</tr></thead><tbody>${rows}</tbody></table>`
  );
}

function buildStudentListRows(
  students: GenerationContext["students"],
  ctx: GenerationContext
): string {
  return students
    .map(
      (s, i) =>
        `<tr><td style="border:1px solid #333;padding:4px;text-align:center">${i + 1}</td>` +
        `<td style="border:1px solid #333;padding:4px">${esc(s.full_name)}</td>` +
        `<td style="border:1px solid #333;padding:4px">${esc(ctx.group.program_title)}</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">${ctx.group.program_hours}</td>` +
        `<td style="border:1px solid #333;padding:4px">${formatDateShort(ctx.group.start_date)}–${formatDateShort(ctx.group.end_date)}</td>` +
        `<td style="border:1px solid #333;padding:4px"></td></tr>`
    )
    .join("");
}

function buildJournalRows(students: GenerationContext["students"]): string {
  return students
    .map(
      (s, i) =>
        `<tr><td style="border:1px solid #333;padding:4px;text-align:center">${i + 1}</td>` +
        `<td style="border:1px solid #333;padding:4px">${esc(s.full_name)}</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">V</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">V</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">V</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">V</td></tr>`
    )
    .join("");
}

function buildAttestationRows(students: GenerationContext["students"]): string {
  const demoScores = [96, 88, 92, 85, 90, 78];
  return students
    .map((s, i) => {
      const score = demoScores[i % demoScores.length];
      const grade = score >= 90 ? "5" : score >= 75 ? "4" : score >= 60 ? "3" : "2";
      return (
        `<tr><td style="border:1px solid #333;padding:4px;text-align:center">${i + 1}</td>` +
        `<td style="border:1px solid #333;padding:4px">${esc(s.full_name)}</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">${score}</td>` +
        `<td style="border:1px solid #333;padding:4px;text-align:center">${grade}</td></tr>`
      );
    })
    .join("");
}

function buildRegistrationRows(
  students: GenerationContext["students"],
  ctx: GenerationContext,
  orderNum: string
): string {
  return students
    .map(
      (s, i) =>
        `<tr><td style="border:1px solid #333;padding:3px;text-align:center">${i + 1}</td>` +
        `<td style="border:1px solid #333;padding:3px">Удостоверение о ПК</td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(ctx.group.program_title)}. Группа ${esc(ctx.group.number)}</td>` +
        `<td style="border:1px solid #333;padding:3px"></td>` +
        `<td style="border:1px solid #333;padding:3px"></td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(s.full_name)}</td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(s.birth_date || "")}</td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(s.gender || "")}</td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(s.passport || "")}</td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(s.citizenship || "Российская Федерация")}</td>` +
        `<td style="border:1px solid #333;padding:3px">${esc(orderNum)}</td>` +
        `<td style="border:1px solid #333;padding:3px"></td>` +
        `<td style="border:1px solid #333;padding:3px"></td>` +
        `<td style="border:1px solid #333;padding:3px"></td>` +
        `<td style="border:1px solid #333;padding:3px"></td>` +
        `<td style="border:1px solid #333;padding:3px"></td></tr>`
    )
    .join("");
}

export interface BuildVariablesOptions {
  documentNumber?: string;
  documentDate?: string;
  primaryStudentIndex?: number;
  totalPrice?: number;
}

export function buildVariables(
  ctx: GenerationContext,
  opts: BuildVariablesOptions = {}
): Record<string, string> {
  const today = opts.documentDate || new Date().toISOString().slice(0, 10);
  const primary = ctx.students[opts.primaryStudentIndex ?? 0];
  const orderNum = opts.documentNumber || "";
  const price = opts.totalPrice ?? Number(ctx.extras?.total_price || 0);

  const vars: Record<string, string> = {
    org_name: ctx.organization.name,
    org_inn: ctx.organization.inn,
    org_kpp: ctx.organization.kpp,
    org_ogrn: ctx.organization.ogrn,
    org_address: ctx.organization.address,
    org_director_name: ctx.organization.director_name,
    org_director_position: ctx.organization.director_position,
    org_bank_name: ctx.organization.bank_name || "",
    org_bank_bik: ctx.organization.bank_bik || "",
    org_bank_account: ctx.organization.bank_account || "",
    org_bank_corr_account: ctx.organization.bank_corr_account || "",
    org_email: ctx.organization.email || "",
    org_phone: ctx.organization.phone || "",
    org_license: ctx.organization.license || "",
    group_name: ctx.group.name,
    group_number: ctx.group.number,
    program_title: ctx.group.program_title,
    program_hours: String(ctx.group.program_hours),
    program_form: ctx.group.program_form,
    start_date: formatDateShort(ctx.group.start_date),
    end_date: formatDateShort(ctx.group.end_date),
    start_date_ru: formatDateRu(ctx.group.start_date),
    end_date_ru: formatDateRu(ctx.group.end_date),
    individual_name: primary?.full_name || "",
    individual_birth_date: primary?.birth_date || "",
    individual_gender: primary?.gender || "",
    individual_passport: primary?.passport || "",
    individual_snils: primary?.snils || "",
    individual_citizenship: primary?.citizenship || "Российская Федерация",
    individual_email: primary?.email || "",
    individual_phone: primary?.phone || "",
    individual_education: primary?.education || "",
    individual_address: primary?.address || "",
    company_name: ctx.company?.name || "",
    company_inn: ctx.company?.inn || "",
    company_kpp: ctx.company?.kpp || "",
    company_ogrn: ctx.company?.ogrn || "",
    company_address: ctx.company?.address || "",
    company_director: ctx.company?.director || "",
    contract_number: opts.documentNumber || "",
    contract_date: formatDateShort(today),
    contract_date_ru: formatDateRu(today),
    order_number: opts.documentNumber || "",
    order_date: formatDateShort(today),
    order_date_ru: formatDateRu(today),
    students_count: String(ctx.students.length),
    total_price: price
      ? price.toLocaleString("ru-RU", { minimumFractionDigits: 2 })
      : "",
    total_price_words: price ? `${price.toLocaleString("ru-RU")} руб.` : "",
    today: formatDateShort(today),
    today_ru: formatDateRu(today),
    year: String(new Date(today).getFullYear()),
    students_table: buildStudentsTable(ctx.students),
    students_list_rows: buildStudentListRows(ctx.students, ctx),
    journal_rows: buildJournalRows(ctx.students),
    attestation_rows: buildAttestationRows(ctx.students),
    registration_rows: buildRegistrationRows(ctx.students, ctx, orderNum),
  };

  if (ctx.extras) {
    for (const [k, v] of Object.entries(ctx.extras)) {
      vars[k] = String(v);
    }
  }
  return vars;
}

export function renderTemplate(
  html: string,
  variables: Record<string, string>,
  rawKeys: string[] = [
    "students_table",
    "students_list_rows",
    "journal_rows",
    "attestation_rows",
    "registration_rows",
  ]
): string {
  const raw = new Set(rawKeys);
  return html.replace(
    /\{\{\s*(&)?\s*([a-zA-Z0-9_]+)\s*\}\}/g,
    (match, isRaw, key) => {
      if (!(key in variables)) return match;
      const val = variables[key] ?? "";
      if (isRaw || raw.has(key)) return val;
      return esc(val);
    }
  );
}

export function findMissing(
  html: string,
  variables: Record<string, string>
): string[] {
  const keys = new Set<string>();
  for (const m of html.matchAll(/\{\{\s*&?\s*([a-zA-Z0-9_]+)\s*\}\}/g)) {
    keys.add(m[1]);
  }
  return [...keys].filter((k) => !variables[k]);
}
