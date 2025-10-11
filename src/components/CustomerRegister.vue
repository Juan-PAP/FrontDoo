<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { CustomerInterface } from './interfaces/Customer';

const today = ref(new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }))

const form: CustomerInterface = reactive({
    identificationNumber: "",
    fullname: "",
    phoneNumber:"",
    birthDate:""

});

const formRef = ref<HTMLFormElement | null>(null)
const successMessage = ref("");

function validateField(input: HTMLInputElement) {
    const feedback = input.parentElement?.querySelector('.invalid-feedback') as HTMLElement;
    input.setCustomValidity("");
    let message = "";

    if (input.validity.valueMissing) {
        message = "Este campo es obligatorio.";

    } else if (input.validity.patternMismatch) {
        if (input.id === "floatinIdentification") {
            message = "El número de identificación solo debe contener dígitos (6 a 25 caracteres).";

    } else if (input.id === "floatingphoneNumber") {
        message = "El número de teléfono solo debe contener dígitos (8 a 20 caracteres).";

    }
    } else if (input.validity.tooShort) {
        message = `Debe tener al menos ${input.minLength} caracteres.`;

    } else if (input.validity.tooLong) {
        message = `Debe tener máximo ${input.maxLength} caracteres.`;
        
    } else if (input.type === "date") {
        const selectedDate = new Date(input.value);

        const today = new Date(
            new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
        );

        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            input.setCustomValidity("La fecha de nacimiento no puede ser en el futuro.");
        } else {
            input.setCustomValidity("");
        }

        input.reportValidity();
    }
    input.setCustomValidity(message);
    if (feedback) feedback.textContent = message;
}

function validateForm() {
    const inputs = formRef.value?.querySelectorAll("input, select");
    inputs?.forEach((input) => validateField(input as HTMLInputElement));
    return formRef.value?.checkValidity();
}

function send () {
    successMessage.value = "";
    if (!validateForm()){
        formRef.value?.classList.add("was-validated");
        return console.log("error");
    }

    successMessage.value = "El cliente se registró correctamente.";
    Object.assign(form, {
        identificationNumber: "",
        fullname: "",
        phoneNumber: "",
        birthDate: ""
    });
    formRef.value?.classList.remove("was-validated");

    setTimeout(() => (successMessage.value = ""), 3000);

    console.log("Formulario valido: ", form.identificationNumber, form.fullname, form.phoneNumber, form.birthDate)
}

</script>

<template>
    <div class="row d-flex justify-content-center my-5">
        <form ref="formRef" @submit.prevent="send" class="col-4 needs-validate" novalidate>
            <div>
                <h1 class="title mb-5 text-center">Registrar cliente</h1>
            </div>

            <div class="mb-4">
                <select class="form-select" aria-label="Tipo de identificación" required>
                    <option value="" disabled selected>Tipo de identificación</option>
                    <option value="1">Tarjeta de identidad</option>
                    <option value="2">Cedula de ciudadania</option>
                    <option value="3">Cedula de extranjeria</option>
                </select>
                <div class="invalid-feedback">Selecciona un tipo de identificación.</div>
            </div>

            <div class="form-floating mb-4">
                <input v-model.trim="form.identificationNumber" type="text" class="form-control" minlength="6" maxlength="25" pattern="\d{6,25}"  required id="floatinIdentification" placeholder="Solo valores numericos" @input="validateField($event.target as HTMLInputElement)">
                <label for="floatingIdemtofication">Número de identificación</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-4">
                <input v-model.trim="form.fullname" type="text" class="form-control" minlength="3" maxlength="100" required id="floatingFullName" placeholder="" @input="validateField($event.target as HTMLInputElement)">
                <label for="floatingInput">Nombre completo</label>
                <div class="invalid-feedback">Debe tener entre 3 y 100 caracteres.</div>
            </div>

            <div class="form-floating mb-4">
                <input v-model.trim="form.phoneNumber" type="text" class="form-control" minlength="8" maxlength="20" pattern="\d{8,20}"  required id="floatingphoneNumber" placeholder="" @input="validateField($event.target as HTMLInputElement)">
                <label for="floatingPassword">Numero de telefono</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-4">
                <input v-model="form.birthDate" type="date" class="form-control" required id="floatingBirthdate" min="1900-01-01" :max="today" @input="validateField($event.target as HTMLInputElement)">
                <label for="floatingPassword">Fecha de nacimiento</label>
                <div class="invalid-feedback">Selecciona una fecha válida.</div>
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