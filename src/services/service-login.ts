// src/services/service-login.ts

// Importa las herramientas genéricas
import { postRequest, type HttpResponse } from './service-http';
// Importa las interfaces
import type { LoginInterface, LoginResponse } from '../components/interfaces/Login';

/**
 * Llama al endpoint del backend para iniciar sesión.
 */
export async function login(credentials: LoginInterface): Promise<HttpResponse<LoginResponse>> {

    // -----------------------------------------------------------------
    /*/ 🔹 OPCIÓN 1: Lógica QUEMADA (para desarrollo)
    // Simulamos una demora de red (opcional, pero útil)
    await new Promise(resolve => setTimeout(resolve, 500)); 

    if (credentials.username === "Jkila" && credentials.password === "Kijuampa") {
        const mockResponse: LoginResponse = {
            token: 'fake-token-qwe-123-asd-456' // Un token simulado
        };
        
        // Guardamos el token falso en localStorage (como haría la lógica real)
        localStorage.setItem('token', mockResponse.token);
        
        return { success: mockResponse };
    } else {
        return { error: 'Usuario o contraseña incorrectos.' };
    }
    // -----------------------------------------------------------------
*/

    
    // -----------------------------------------------------------------
    // 🔸 OPCIÓN 2: Lógica REAL (para producción)
    // Cuando tu backend esté listo, comenta el bloque de arriba
    // y descomenta este bloque.

    // 1. Llama a tu 'postRequest' genérico
    const response = await postRequest<LoginResponse>("/service/login", credentials);

    // 2. Si el login fue exitoso, guarda el token
    if (response.success && response.success.token) {
        localStorage.setItem('token', response.success.token);
    }

    // 3. Devuelve la respuesta al componente
    return response;
    // -----------------------------------------------------------------
    
}