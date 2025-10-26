<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCustomers } from '../services/service-customer'; // 🔹 NUEVO
import type { Cliente } from './interfaces/Customer'; // 🔹 NUEVO (interfaz centralizada)

const clientes = ref<Cliente[]>([])
const isLoading = ref(true); // 🔹 NUEVO: Estado de carga
const errorMessage = ref<string | null>(null); // 🔹 NUEVO: Estado de error

// 🔸 MODIFICADO: onMounted ahora es async y llama al servicio
onMounted(async () => {
    isLoading.value = true;
    errorMessage.value = null;

    const response = await getCustomers();

    if (response.success) {
        clientes.value = response.success;
    } else {
        errorMessage.value = response.error || "No se pudieron cargar los clientes.";
    }
    
    isLoading.value = false;
})

</script>

<template>
    <div class=" row d-flex justify-content-end px-5 " >
        <h1 class="color-cliente px-5 display-2 fw-bold mt-5 mb-5 col-10 ">Clientes</h1>
    </div>
        
    <div class=" row d-flex justify-content-end " >

        <div class="d-flex justify-content-end">
            <router-link to="/customer/register"  class=" btn btn-primary display-2 fw-bold mt-3 mb-3 col-2 ">Registrar nuevo cliente</router-link>
        </div>

        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary display-2 fw-bold mt-3 mb-3 col-2 ">Filtrar</button>
        </div>

        <div v-if="isLoading" class="text-center px-5 mt-5 col-10">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="fs-4 mt-2">Cargando clientes...</p>
        </div>

        <div v-else-if="errorMessage" class="alert alert-danger mx-auto mt-5 col-10">
            {{ errorMessage }}
        </div>
        
        <div v-else-if="clientes.length === 0" class="alert alert-info mx-auto mt-5 col-10">
            No hay clientes registrados por el momento.
        </div>

        <div v-else class="table-responsive px-5 mt-5 col-10 ">
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Tipo de identificacion</th>
                        <th scope="col">Numero de Identificacion</th>
                        <th scope="col">Nombre completo</th>
                        <th scope="col">Numero de telefono</th>
                        <th scope="col">Fecha de nacimiento</th>
                        <th scope="col">Edad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes" :key="cliente.id">
                        <td>{{ cliente.tipoIdentificacion }}</td>
                        <td>{{ cliente.numeroIdentificacion }}</td>
                        <td>{{ cliente.nombreCompleto }}</td>
                        <td>{{ cliente.telefono }}</td>
                        <td>{{ cliente.fechaNacimiento }}</td>
                        <td>{{ cliente.edad }}</td>
                    </tr>
                </tbody>
            </table>
        </div>  
        
    </div>
</template>

<style scoped>
.color-cliente {
    color: #2575fc
}
</style>