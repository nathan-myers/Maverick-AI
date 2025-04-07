export interface WaitlistEntry {
  id: string;
  full_name: string;
  email: string;
  company: string;
  role: string;
  use_case: string;
  monthly_users: string;
  created_at: string;
}

export interface WaitlistForm {
  fullName: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
  monthlyUsers: string;
} 