export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  skills?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}
