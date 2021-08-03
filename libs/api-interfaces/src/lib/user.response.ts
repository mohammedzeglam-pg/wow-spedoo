export interface CreateUserResponse {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}
export interface LoginResponse {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  role?: string;
  identity?: number;
  is_allowed: boolean;
  access_token: string;
}

export interface UserResponse {
  id: number;
  username: string;
  firstname: string;
  phone: string;
  lastname: string;
  is_allowed: boolean | string;
  role: string;
}
