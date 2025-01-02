export interface IInsertNewStudent {
  reference_id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  username: string;
  password: string;
  is_active: boolean;
  image_url: string;
}

export interface IInsertStudentBody {
  firstname: string;
  lastname: string;
  middlename: string;
  username: string;
  password: string;
  is_active: boolean;
  image_file: string;
}

export interface IUpdateStudentBody {
  id: number;
  reference_id?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  username?: string;
  password?: string;
  is_active?: boolean;
  image_file?: string;
}
