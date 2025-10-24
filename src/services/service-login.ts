import type { LoginInterface } from "../components/interfaces/Login";

export function login(data:LoginInterface){

  const { username, password } = data; 
  
  if (!username || !password) {
    return { error: "El nombre de usuario es obligatorio." };
  }
  
  data.password = "Jkila";
  data.username = "Kijuampa";
  
  console.log("Usuario", username, password)
  localStorage.setItem('token', ' token');

}
