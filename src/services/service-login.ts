import { postRequest, type HttpResponse } from './service-http';
import type { LoginInterface, LoginResponse } from '../components/interfaces/Login';

export async function login(credentials: LoginInterface): Promise<HttpResponse<LoginResponse>> {

    const response = await postRequest<LoginResponse>("/api/v1/administrators/login", credentials);

    if (response.success && (response.success as any).responseSucceded) {

        localStorage.setItem('token', 'true');
    }

    return response;
    
}