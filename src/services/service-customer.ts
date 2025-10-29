import type { CustomerInterface, Customer} from "../components/interfaces/Customer";
import { getRequest, postRequest, type HttpResponse } from "./service-http";
/**
 * Obtiene la lista de todos los clientes.
 */
export async function getCustomers(): Promise<HttpResponse<Customer[]>> {
    return await getRequest<Customer[]>("/api/v1/customers");
    
}
/**
 * Registra un nuevo cliente.
 */
export async function registerCustomer(data: CustomerInterface): Promise<HttpResponse<{ id: number }>> {
    return await postRequest<{ id: number }>("/api/v1/customers", data);
}