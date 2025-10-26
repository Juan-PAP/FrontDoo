// src/interfaces/Login.ts

// Los datos que el formulario ENVÍA
export interface LoginInterface {
  username: string;
  password: string;
}

// La respuesta que el backend DEVUELVE si el login es exitoso
export interface LoginResponse {
  token: string;
  // (opcional) user: { name: string, email: string } 
}