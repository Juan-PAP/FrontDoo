<script setup lang="ts">
import { reactive, ref } from 'vue';
import { show } from '../modules/state';

interface Login {
    identificationNumber: string;
    fullname: string;
    phoneNumber: string;
    birthDate: Date;
}
const form = reactive ({
    identificationNumber: "",
    fullname: "",
    phoneNumber:"",
    birthDate:"00/00/00"

});

const formRef = ref<HTMLFormElement | null>(null)


function validate(){
    return formRef.value?.checkValidity()
}

function send () {
    if (!validate()){
        return console.log("error")
    }
    show.value = true;

    console.log("Formulario valido: ", form.identificationNumber, form.fullname, form.phoneNumber, form.birthDate)
}


</script>

<template>
    <div class="row d-flex justify-content-center my-5">
        <form ref="formRef" @submit.prevent="send" class="col-4">
        <div>
            <h1 class="title mb-5 text-center">Registrar cliente</h1>
        </div>

        <select class="form-select mb-4" aria-label="Default select example">
            <option selected>Tipo de identificacion</option>
            <option value="1">Tarjeta de identidad</option>
            <option value="2">Cedula de ciudadania</option>
            <option value="3">Cedula de extranjeria</option>
        </select>

        <div class="form-floating mb-4">
            <input v-model="form.identificationNumber" type="text" class="form-control" minlength="6" maxlength="25" required id="floatingInput" placeholder="123456789">
            <label for="floatingPassword">Numero de identificacion</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.fullname" type="text" class="form-control" minlength="3" maxlength="100" required id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Nombre completo</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.phoneNumber" type="text" class="form-control" minlength="8" maxlength="20" required id="floatingInput" placeholder="3118671137">
            <label for="floatingPassword">Numero de telefono</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.birthDate" type="date" class="form-control" required id="floatingInput" placeholder="01/01/1900">
            <label for="floatingPassword">Fecha de nacimiento</label>
        </div>

        <div>
            <button type="submit" class="btn btn-primary mb-3 ">Registrar</button>
        </div>
        <div>
            <button type="button" class="btn btn-danger mb-3">Cancelar</button>
        </div>

        
    </form>

    </div>
    
</template>

<style scoped>
.title {
    font-size: 300%;
    text-shadow: 5px 5px 10px rgba(0,0,0,0.5);
}

.aurora {
    font-size: 150%;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
}
</style>