<script setup lang="ts">
import { reactive, ref } from 'vue';

const today = ref(new Date().toISOString().split('T')[0])

interface Record {
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
const successMessage = ref("");

function validate(){
    return formRef.value?.checkValidity()
}

function send () {
    successMessage.value = "";
    if (!validate()){
        return console.log("error")
    }

    successMessage.value = "El cliente se registró correctamente.";
    form.identificationNumber = "";
    form.fullname = "";
    form.phoneNumber = "";
    form.birthDate = "";
    setTimeout(() => (successMessage.value = ""), 3000);

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
            <input v-model.trim="form.identificationNumber" type="text" class="form-control" minlength="6" pattern="\d{6,25}" maxlength="25" required id="floatinIdentification" placeholder="Solo valores numericos">
            <label for="floatingPassword">Numero de identificacion</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model.trim="form.fullname" type="text" class="form-control" minlength="3" maxlength="100" required id="floatingFullNumber" placeholder="">
            <label for="floatingInput">Nombre completo</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model.trim="form.phoneNumber" type="text" class="form-control" minlength="8" pattern="\d{8,20}" maxlength="20" required id="floatingphoneNumber" placeholder="">
            <label for="floatingPassword">Numero de telefono</label>
        </div>

        <div class="form-floating mb-4">
            <input v-model="form.birthDate" type="date" class="form-control" required id="floatingBirthdate" min="1900-01-01":max="today">
            <label for="floatingPassword">Fecha de nacimiento</label>
        </div>

        <div class="d-flex justify-content-between mb-3">
            <router-link to="/customer" class="btn btn-danger">Cancelar</router-link>
            <button type="submit" class="btn btn-primary">Registrar</button>
        </div>
        
        <transition name="slide-fade">
            <div v-if="successMessage" class="alert-success-custom mt-3 text-center p-3 fw-semibold rounded">
                <i class="bi bi-check-circle-fill me-2"></i>
                {{ successMessage }}
            </div>
        </transition>
        </form>
    </div>
</template>

<style scoped>
.title {
    font-size: 2.3rem;
    font-weight: 600;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    }


.alert-success-custom {
    background: linear-gradient(90deg, #20c997);
    color: #fff;
    letter-spacing: 0.3px;
}
</style>