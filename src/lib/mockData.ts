import type { Student, ContractTemplate, GroupInfo, GeneratedContract } from "@/types";

export const MOCK_GROUP: GroupInfo = {
  id: "group-1",
  name: "1-ПК-26 Проектирование",
  start_date: "2026-01-13",
  end_date: "2026-01-16",
  program_title: "Проектирование электроустановок во взрывоопасных зонах",
  hours: 40,
  color: "#6366f1",
};

export const MOCK_STUDENTS: Student[] = [
  { user_id: "s1", full_name: "Иванов Иван Иванович", email: "ivanov@example.com" },
  { user_id: "s2", full_name: "Петрова Анна Сергеевна", email: "petrova@example.com" },
  { user_id: "s3", full_name: "Сидоров Алексей Петрович", email: "sidorov@example.com" },
];

export const MOCK_TEMPLATES: ContractTemplate[] = [
  { id: "tpl-1", name: "Договор оказания платных образовательных услуг", is_default: true },
  { id: "tpl-2", name: "Договор с юридическим лицом (краткий)", is_default: false },
];

/** Симуляция генерации договора (в Синтагме здесь будет реальный вызов). */
export async function mockGenerateContract(params: {
  students: Student[];
  template: ContractTemplate;
  group: GroupInfo;
}): Promise<GeneratedContract> {
  await new Promise((r) => setTimeout(r, 1200));

  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 900) + 100);
  const number = `${year}-${seq}`;

  return {
    id: `c-${Date.now()}`,
    name: `Договор ${number}`,
    contract_number: number,
    contract_date: new Date().toISOString().slice(0, 10),
    student_names: params.students.map((s) => s.full_name),
    status: "active",
    created_at: new Date().toISOString(),
  };
}
