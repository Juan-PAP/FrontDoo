// src/services/service-customer.ts

import type { CustomerInterface, Cliente } from "../components/interfaces/Customer"; // 🔸 MODIFICADO
import { getRequest, postRequest, type HttpResponse } from "./service-http";

// --- OBTENER CLIENTES ---

// 🔹 Datos quemados (los movimos desde Customer.vue)
const mockClientes: Cliente[] = [
    {
        id: 1,
        tipoIdentificacion: 'Tarjeta de identidad',
        numeroIdentificacion: '123456789',
        nombreCompleto: 'Mark Otto',
        telefono: '3222222222',
        fechaNacimiento: '1990-05-05',
        edad: 34,
    },
    {
        id: 2,
        tipoIdentificacion: 'Cedula de ciudadania',
        numeroIdentificacion: '987654321',
        nombreCompleto: 'Jacob Thornton',
        telefono: '3111111111',
        fechaNacimiento: '1985-05-05',
        edad: 39,
    },
    {
        id: 3,
        tipoIdentificacion: 'Cedula de extranjeria',
        numeroIdentificacion: '555555555',
        nombreCompleto: 'John Doe',
        telefono: '3000000000',
        fechaNacimiento: '1980-05-05',
        edad: 45,
    },
];

/**
 * Obtiene la lista de todos los clientes.
 */
export async function getCustomers(): Promise<HttpResponse<Cliente[]>> {
    /*
    // 🔹 OPCIÓN 1: Lógica QUEMADA
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular red
    return { success: mockClientes };
    */
    
    // 🔸 OPCIÓN 2: Lógica REAL
    // Cuando estés listo, comenta la línea de arriba y descomenta esta:
    return await getRequest<Cliente[]>("/customers"); // Asumiendo que tu endpoint es /customers
    
}


// --- REGISTRAR CLIENTE ---

/**
 * Registra un nuevo cliente.
 */
export async function registerCustomer(data: CustomerInterface): Promise<HttpResponse<{ id: number }>> { // 🔹Devolvemos un ID simulado
/*
    // 🔹 OPCIÓN 1: Lógica QUEMADA
    console.log("Enviando cliente (simulado) a la API:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simular red
    
    // Opcional: simular un error de backend
    // if (data.identificationNumber === "123456") {
    //    return { error: "Este número de identificación ya existe." }
    // }

    // Simular respuesta exitosa
    return { success: { id: Math.floor(Math.random() * 1000) } };
*/

    
    // 🔸 OPCIÓN 2: Lógica REAL
    // Cuando estés listo, comenta el bloque de arriba y descomenta este:
    return await postRequest<{ id: number }>("/customers/register", data); // Asumiendo que tu endpoint es /customers/register
    
}