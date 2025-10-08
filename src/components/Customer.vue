<script setup lang="ts">
</script>

<template>

    <div class=" row d-flex justify-content-end px-5 " >
        <h1 class="color-cliente px-5 display-2 fw-bold mt-5 mb-5 col-10 ">Cliente</h1>
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
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>322222</td>
                <td>5/5/5</td>
                <td>45</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>322222</td>
                <td>5/5/5</td>
                <td>45</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>John</td>
                <td>Doe</td>
                <td>322222</td>
                <td>5/5/5</td>
                <td>45</td>
                </tr>
                <tr>
                <th scope="row">4</th>
                <td>John</td>
                <td>Doe</td>
                <td>322222</td>
                <td>5/5/5</td>
                <td>45</td>
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