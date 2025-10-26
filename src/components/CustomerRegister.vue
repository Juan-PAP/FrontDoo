<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { CustomerInterface } from './interfaces/Customer';
import { registerCustomer } from '../services/service-customer'; // 🔹 NUEVO
import router from '../router'; // 🔹 NUEVO (para redirigir)

const today = ref(new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' }))

const form: CustomerInterface = reactive({
    identificationType: "",
    identificationNumber: "",
    fullname: "",
    phoneNumber:"",
    birthDate:""
});

const formRef = ref<HTMLFormElement | null>(null)
const successMessage = ref("");
const errorMessage = ref(""); // 🔹 NUEVO: Para errores del "backend"
const isLoading = ref(false); // 🔹 NUEVO: Estado de carga

const identificationTypeOptions = [
    { value: "TI", text: "Tarjeta de identidad" },
    { value: "CC", text: "Cédula de ciudadanía" },
    { value: "CE", text: "Cédula de extranjería" },
];

// ... (Todas tus funciones de validación: validateAgeAndDocument, watch, validateField, validateForm ... van aquí. No necesitan cambios)
function validateAgeAndDocument(): string | null {
    const docType = form.identificationType as 'CC' | 'TI' | 'CE';
    const birthDateStr = form.birthDate;

    if (!birthDateStr || (docType !== 'CC' && docType !== 'TI')) {
        return null;
    }

    const fechaNacimiento = new Date(birthDateStr);
    const hoy = new Date();
    
    const fechaMayoriaEdad = new Date(fechaNacimiento);
    fechaMayoriaEdad.setFullYear(fechaNacimiento.getFullYear() + 18);

    const esMayorDeEdad = hoy >= fechaMayoriaEdad;

    if (esMayorDeEdad) {
        if (docType === 'TI') {
            return 'Para mayores de 18 años, el tipo de documento debe ser Cédula de Ciudadanía (CC).';
        }
    } else {
        if (docType === 'CC') {
            return 'Para menores de 18 años, el tipo de documento debe ser Tarjeta de Identidad (TI).';
        }
    }
    
    return null; 
}

watch([() => form.identificationType, () => form.birthDate], () => {

    if ((form.identificationType && form.birthDate)) {
        const docInput = formRef.value?.querySelector('#floatingIdentificationType') as HTMLSelectElement;
        const dateInput = formRef.value?.querySelector('#floatingBirthdate') as HTMLInputElement;
        if (docInput) validateField(docInput);
        if (dateInput) validateField(dateInput);
    }
}, { flush: 'post' });

function validateField(input: HTMLInputElement | HTMLSelectElement) {
    const feedback = input.parentElement?.querySelector('.invalid-feedback') as HTMLElement;
    let message = "";

    input.setCustomValidity("");

    if (input instanceof HTMLInputElement) {

        if (input.validity.valueMissing) {
            message = "Este campo es obligatorio.";

        } else if (input.validity.patternMismatch) {
            if (input.id === "floatingIdentification") {
                message = "El número de identificación solo debe contener dígitos (6 a 25 caracteres).";

            } else if (input.id === "floatingPhoneNumber") {
                message = "El número de teléfono solo debe contener dígitos (8 a 20 caracteres).";
            }
        } else if (input.validity.tooShort) {
            message = `Debe tener al menos ${input.minLength} caracteres.`;

        } else if (input.validity.tooLong) {
            message = `Debe tener máximo ${input.maxLength} caracteres.`;
            
        } else if (input.type === "date") {
            const selectedDate = new Date(input.value);

            const todayDate = new Date(
                new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
            );

            selectedDate.setHours(0, 0, 0, 0);
            todayDate.setHours(0, 0, 0, 0);

            if (selectedDate > todayDate) {
                input.setCustomValidity("La fecha de nacimiento no puede ser en el futuro.");
            } 
        }
    
    } else if (input instanceof HTMLSelectElement) {
        if (input.validity.valueMissing) {
            message = "Debes seleccionar una opción.";
        }
    }

    if (!message) {
        const ageDocError = validateAgeAndDocument();
        if (ageDocError && (input.id === 'floatingBirthdate' || input.id === 'floatingIdentificationType')) {
            message = ageDocError;
        }
    }

    input.setCustomValidity(message);

    if (feedback) {
        feedback.textContent = message || (input as HTMLInputElement).validationMessage;
    }
}


function validateForm() {
    const inputs = formRef.value?.querySelectorAll("input, select");
    let isFormValid = true;
    inputs?.forEach((input) => {

        const formElement = input as (HTMLInputElement | HTMLSelectElement);

        validateField(formElement); 
        if (!formElement.checkValidity()) {
            isFormValid = false;
        }
    });
    return isFormValid;
}

// 🔸 MODIFICADO: La función 'send' ahora es 'async'
async function send () {
    successMessage.value = "";
    errorMessage.value = ""; // 🔹 Limpiamos error previo
    formRef.value?.classList.add("was-validated")

    if (!validateForm()){
        return console.log("error: Formulario inválido");
    }

    isLoading.value = true; // 🔹 Empezamos a cargar

    // 🔸 MODIFICADO: Llamamos al servicio de registro
    const response = await registerCustomer(form);
    
    isLoading.value = false; // 🔹 Terminamos de cargar

    if (response.success) {
        successMessage.value = "El cliente se registró correctamente.";
        Object.assign(form, {
            identificationType: "",
            identificationNumber: "",
            fullname: "",
            phoneNumber: "",
            birthDate: ""
        });
        formRef.value?.classList.remove("was-validated");

        // Redirigimos a la lista de clientes después de 2 segundos
        setTimeout(() => {
            successMessage.value = "";
            router.push('/customer');
        }, 2000);

    } else {
        // Mostramos el error simulado del backend
        errorMessage.value = response.error || "Ocurrió un error al registrar el cliente.";
        setTimeout(() => (errorMessage.value = ""), 4000);
    }
}
</script>

<template>
    <div class="row d-flex justify-content-center my-5">
        <form ref="formRef" @submit.prevent="send" class="col-4 needs-validate" novalidate>
            <div>
                <h1 class="title mb-5 text-center">Registrar cliente</h1>
            </div>

            <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
                {{ errorMessage }}
            </div> 

            <div class="mb-4"> 
                <select 
                    class="form-select" 
                    aria-label="Tipo de identificación" 
                    required 
                    v-model="form.identificationType" 
                    id="floatingIdentificationType"
                    @change="validateField($event.target as HTMLSelectElement)"
                    :disabled="isLoading" 
                >
                    <option value="" disabled selected>Tipo de identificación</option>
                    <option v-for="type in identificationTypeOptions" :key="type.value" :value="type.value">
                        {{ type.text }}
                    </option>
                </select>
                <div class="invalid-feedback">Selecciona un tipo de identificación.</div>
            </div>
            
            <div class="form-floating mb-4">
                <input v-model.trim="form.identificationNumber" type="text" class="form-control" minlength="6" maxlength="25" pattern="\d{6,25}"  required id="floatingIdentification" placeholder="" @input="validateField($event.target as HTMLInputElement)" :disabled="isLoading">
                <label for="floatingIdentification">Número de identificación</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-4">
                <input v-model.trim="form.fullname" type="text" class="form-control" minlength="3" maxlength="100" required id="floatingFullName" placeholder="" @input="validateField($event.target as HTMLInputElement)" :disabled="isLoading">
                <label for="floatingFullName">Nombre completo</label>
                <div class="invalid-feedback">Debe tener entre 3 y 100 caracteres.</div>
            </div>

            <div class="form-floating mb-4">
                <input v-model.trim="form.phoneNumber" type="text" class="form-control" minlength="8" maxlength="20" pattern="\d{8,20}"  required id="floatingPhoneNumber" placeholder="" @input="validateField($event.target as HTMLInputElement)" :disabled="isLoading">
                <label for="floatingPhoneNumber">Numero de telefono</label>
                <div class="invalid-feedback"></div>
            </div>

            <div class="form-floating mb-4">
                <input v-model="form.birthDate" type="date" class="form-control" required id="floatingBirthdate" min="1900-01-01" :max="today" @input="validateField($event.target as HTMLInputElement)" :disabled="isLoading">
                <label for="floatingBirthdate">Fecha de nacimiento</label>
                <div class="invalid-feedback">Selecciona una fecha válida.</div>
            </div>


            <div class="d-flex justify-content-between mb-3">
                <router-link to="/customer" class="btn btn-danger" :class="{ disabled: isLoading }">Cancelar</router-link> <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">{{ isLoading ? 'Registrando...' : 'Registrar' }}</span>
                </button>
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
/* Tus estilos (sin cambios) */
.title {
    font-size: 2.3rem;
    font-weight: 600;
    text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    }
.alert-success-custom {
    background-color: #20c997;
    color: #fff;
    letter-spacing: 0.3px;
}
</style>