<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Cliente {
    id: number
    tipoIdentificacion: string
    numeroIdentificacion: string
    nombreCompleto: string
    telefono: string
    fechaNacimiento: string
    edad: number
}

const clientes = ref<Cliente[]>([])

onMounted(() => {
    clientes.value = [
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
    ]
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

        <div class="table-responsive px-5 mt-5 col-10 ">
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