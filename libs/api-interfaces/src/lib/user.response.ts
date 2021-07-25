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
