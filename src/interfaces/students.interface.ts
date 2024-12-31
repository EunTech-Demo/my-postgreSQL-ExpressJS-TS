export interface IInsertNewStudent {
  reference_id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  username: string;
  password: string;
  is_active: boolean;
}

export interface IInsertStudentBody {
  firstname: string;
  lastname: string;
  middlename: string;
  username: string;
  password: string;
  is_active: boolean;
}
