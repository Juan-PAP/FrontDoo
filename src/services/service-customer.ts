import type { CustomerInterface, Customer} from "../components/interfaces/Customer";
import { getRequest, postRequest, type HttpResponse } from "./service-http";

export async function getCustomers(): Promise<HttpResponse<Customer[]>> {
    return await getRequest<Customer[]>("/api/v1/customers");
    
}

export async function registerCustomer(data: CustomerInterface): Promise<HttpResponse<{ id: number }>> {
     return await postRequest<{ id: number }>("/api/v1/customers", data);
}