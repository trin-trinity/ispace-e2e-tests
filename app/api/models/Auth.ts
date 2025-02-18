export interface AuthRequest {
  login: string;
  password: string;
  slug: string;
}

export interface AuthResponse {
  token: string;
}
