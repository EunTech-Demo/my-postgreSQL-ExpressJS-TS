export interface IUserDTO {
  id: number | string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string | null;
}

export interface ICreateUserBody {
  username: string;
  password: string;
}

export interface IUpdateUserBody {
  username: string;
  password: string;
  isActive: boolean;
}

export interface IRouteGetAllUsersQuery {
  username?: string;
}
