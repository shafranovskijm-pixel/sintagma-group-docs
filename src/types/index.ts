export interface Student {
  user_id: string;
  full_name: string;
  email?: string | null;
}

export interface ContractTemplate {
  id: string;
  name: string;
  is_default?: boolean;
}

export interface GeneratedContract {
  id: string;
  name: string;
  contract_number: string;
  contract_date: string;
  student_names: string[];
  status: "active" | "draft";
  created_at: string;
}

export interface GroupInfo {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  program_title: string;
  hours: number;
  color?: string;
}
