// src/components/interfaces/Customer.ts

// 🔹 Interfaz para el formulario de REGISTRO
export interface CustomerInterface {
    identificationType: string;
    identificationNumber: string;
    fullname: string;
    phoneNumber: string;
    birthDate: string;
}

// 🔹 Interfaz para la LISTA de clientes (la movimos desde Customer.vue)
export interface Cliente {
    id: number
    tipoIdentificacion: string
    numeroIdentificacion: string
    nombreCompleto: string
    telefono: string
    fechaNacimiento: string
    edad: number
}