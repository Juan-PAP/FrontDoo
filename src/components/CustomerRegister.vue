<script setup lang="ts">
import { reactive, ref } from 'vue';
import { show } from '../modules/state';
import router from '../router';

const today = ref(new Date().toISOString().split('T')[0])

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
    birthDate:""

});

const formRef = ref<HTMLFormElement | null>(null)

function validate(){
    return formRef.value?.checkValidity()
}

function send () {
    if (!validate()){
        return console.log("error")
    }
    router.push('/customer')
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

        <select class="form-select mb-4" aria-label="Tipo de identificación" required>
            <option value="" disabled selected>Tipo de identificación</option>
            <option value="1">Tarjeta de identidad</option>
            <option value="2">Cedula de ciudadania</option>
            <option value="3">Cedula de extranjeria</option>
        </select>

        <div class="form-floating mb-4">
            <input v-model="form.identificationNumber" type="text" class="form-control" minlength="6" pattern="\d{6,25}" maxlength="25" required id="floatinIdentification" placeholder="Solo valores numericos">
            <label for="floatingPassword">Numero de identificacion</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.fullname" type="text" class="form-control" minlength="3" maxlength="100" required id="floatingFullNumber" placeholder="">
            <label for="floatingInput">Nombre completo</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.phoneNumber" type="text" class="form-control" minlength="8" pattern="\d{8,20}" maxlength="20" required id="floatingphoneNumber" placeholder="">
            <label for="floatingPassword">Numero de telefono</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.birthDate" type="date" class="form-control" required id="floatingBirthdate" min="1900-01-01":max="today">
            <label for="floatingPassword">Fecha de nacimiento</label>
        </div>

        <div class="d-flex justify-content-between mb-3">
            <button type="button" class="btn btn-danger mb-3">Cancelar</button>
            <button type="submit" class="btn btn-primary mb-3 ">Registrar</button>
        </div>

        
    </form>

    </div>
    
</template>

<style scoped>
.title {
    font-size: 300%;
    text-shadow: 5px 5px 10px rgba(0,0,0,0.5);
}
</style>