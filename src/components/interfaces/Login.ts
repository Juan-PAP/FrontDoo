export interface LoginInterface {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  // (opcional) user?: { name: string, email: string } 
}