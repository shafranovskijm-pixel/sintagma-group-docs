export type DocType =
  | "contract"
  | "enrollment_order"
  | "expulsion_order"
  | "student_list"
  | "class_journal"
  | "schedule"
  | "attestation_sheet"
  | "registration_book"
  | "title_page"
  | "pass";

export interface GenerationContext {
  organization: {
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    address: string;
    director_name: string;
    director_position: string;
    bank_name?: string;
    bank_bik?: string;
    bank_account?: string;
    bank_corr_account?: string;
    email?: string;
    phone?: string;
    license?: string;
  };
  group: {
    id: string;
    name: string;
    number: string;
    start_date: string;
    end_date: string;
    program_title: string;
    program_hours: number;
    program_form: string;
    color?: string;
  };
  students: Array<{
    user_id: string;
    full_name: string;
    birth_date?: string;
    gender?: "М" | "Ж";
    passport?: string;
    snils?: string;
    citizenship?: string;
    email?: string;
    phone?: string;
    education?: string;
    position?: string;
    address?: string;
  }>;
  company?: {
    id: string;
    name: string;
    inn: string;
    kpp?: string;
    ogrn?: string;
    address?: string;
    director?: string;
  };
  extras?: Record<string, string | number>;
}

export interface GeneratedDocument {
  id: string;
  doc_type: DocType;
  name: string;
  document_number: string | null;
  document_date: string;
  variables: Record<string, string>;
  html: string;
  status: "active" | "draft";
  created_at: string;
}
