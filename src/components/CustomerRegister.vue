<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { CustomerInterface } from './interfaces/Customer';

// Usamos ref para que Vue pueda rastrear los cambios
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

const identificationType = [
    { value: "TI", text: "Tarjeta de identidad" },
    { value: "CC", text: "Cédula de ciudadanía" },
    { value: "CE", text: "Cédula de extranjería" },
    // Puede añadir o quitar elementos aquí fácilmente
];

// --- NUEVA LÓGICA DE VALIDACIÓN DE EDAD Y DOCUMENTO ---
/**
 * Valida si el tipo de documento (CC/TI) concuerda con la mayoría de edad (18 años)
 * basado en la fecha de nacimiento.
 * @returns Un string con el mensaje de error o null si la validación es exitosa.
 */
function validateAgeAndDocument(): string | null {
    const docType = form.identificationType as 'CC' | 'TI' | 'CE';
    const birthDateStr = form.birthDate;

    // Solo aplicamos esta regla si los campos requeridos están llenos y el tipo es CC o TI
    if (!birthDateStr || (docType !== 'CC' && docType !== 'TI')) {
        return null; // No hay error, la regla no aplica o faltan datos
    }

    const fechaNacimiento = new Date(birthDateStr);
    const hoy = new Date();
    
    // 1. Calcular la fecha exacta de cumplimiento de 18 años
    const fechaMayoriaEdad = new Date(fechaNacimiento);
    fechaMayoriaEdad.setFullYear(fechaNacimiento.getFullYear() + 18);

    // 2. Determinar si es mayor o menor de 18
    const esMayorDeEdad = hoy >= fechaMayoriaEdad;

    // 3. Aplicar las restricciones
    if (esMayorDeEdad) {
        // Mayor de 18: DEBE usar Cédula de Ciudadanía (CC)
        if (docType === 'TI') {
            return 'Para mayores de 18 años, el tipo de documento debe ser Cédula de Ciudadanía (CC).';
        }
    } else {
        // Menor de 18: DEBE usar Tarjeta de Identidad (TI)
        if (docType === 'CC') {
            return 'Para menores de 18 años, el tipo de documento debe ser Tarjeta de Identidad (TI).';
        }
    }
    
    return null; 
}
// --- FIN NUEVA LÓGICA ---

function validateField(input: HTMLInputElement | HTMLSelectElement) {
    const feedback = input.parentElement?.querySelector('.invalid-feedback') as HTMLElement;
    let message = "";
    
    // Resetear la validez personalizada antes de validar
    input.setCustomValidity("");

    // 1. Validaciones HTML estándar
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
    } 
    
    // 2. Validación de Fecha en el Futuro (lo que ya tenías)
    else if (input.type === "date") {
        const selectedDate = new Date(input.value);
        const hoy = new Date(); // Usamos 'hoy' directo, es más sencillo y preciso
        
        // Ajustamos las horas para comparar solo la fecha
        selectedDate.setHours(0, 0, 0, 0);
        hoy.setHours(0, 0, 0, 0);

        if (selectedDate > hoy) {
            message = "La fecha de nacimiento no puede ser en el futuro.";
        }
    }

    // 3. Validación de la EDAD y TIPO DE DOCUMENTO
    let ageDocError: string | null = null;
    
    // Si la validación de fecha pasó (o no aplica), probamos la validación de edad/documento
    if (!message && (form.identificationType === 'CC' || form.identificationType === 'TI') && form.birthDate) {
        ageDocError = validateAgeAndDocument();
        if (ageDocError) {
            message = ageDocError;
        }
    }
    
    // Aplicar el mensaje de error o cadena vacía si todo está OK
    input.setCustomValidity(message);

    // Mostrar el mensaje en el feedback
    if (feedback) feedback.textContent = message;
    
    // Reportar la validez al navegador para actualizar estilos (Bootstrap)
    input.reportValidity();
    
    // Importante: Si la validación de fecha o documento cambia, debemos revalidar el otro campo.
    // Esto asegura que al cambiar la fecha, se revalide el tipo de documento y viceversa.
    if (input.id === 'floatingBirthdate' || input.id === 'floatingIdentificationType') {
        const otherInputId = input.id === 'floatingBirthdate' ? 'floatingIdentificationType' : 'floatingBirthdate';
        const otherInput = formRef.value?.querySelector(`#${otherInputId}`) as HTMLInputElement | HTMLSelectElement;
        if (otherInput) {
            validateField(otherInput);
        }
    }
}

function validateForm() {
    const inputs = formRef.value?.querySelectorAll("input, select");
    
    // Usamos `(input as HTMLInputElement | HTMLSelectElement)` para el tipado
    inputs?.forEach((input) => validateField(input as HTMLInputElement | HTMLSelectElement));
    
    // Revalidamos al final por si la validación de edad generó un error que no está atado a un input.
    const ageDocError = validateAgeAndDocument();
    
    // En el caso de error de edad/documento, lo mostramos en los campos relevantes.
    if (ageDocError) {
        const docInput = formRef.value?.querySelector('#floatingIdentificationType') as HTMLSelectElement;
        if (docInput) {
             docInput.setCustomValidity(ageDocError);
             const feedback = docInput.parentElement?.querySelector('.invalid-feedback') as HTMLElement;
             if (feedback) feedback.textContent = ageDocError;
             docInput.reportValidity(); // Para mostrar el error
        }
    }


    // El formulario es válido solo si no hay errores en los campos ni en la validación cruzada.
    return formRef.value?.checkValidity() && !ageDocError;
}

function send () {
    successMessage.value = "";
    if (!validateForm()){
        formRef.value?.classList.add("was-validated");
        return console.log("error: Formulario inválido");
    }

    successMessage.value = "El cliente se registró correctamente.";
    Object.assign(form, {
        identificationType: "",
        identificationNumber: "",
        fullname: "",
        phoneNumber: "",
        birthDate: ""
    });
    formRef.value?.classList.remove("was-validated");

    setTimeout(() => (successMessage.value = ""), 3000);

    console.log("Formulario valido: ", form)
}


</script>

<template>
    <div class="row d-flex justify-content-center my-5">
        <form ref="formRef" @submit.prevent="send" class="col-4 needs-validate" novalidate>
            <div>
                <h1 class="title mb-5 text-center">Registrar cliente</h1>
            </div>

            <div class="mb-4"> 
                <select 
                    class="form-select" 
                    aria-label="Tipo de identificación" 
                    required 
                    v-model="form.identificationType" 
                    @change="validateField($event.target as HTMLInputElement)"
                >
                    <option value="" disabled selected>Tipo de identificación</option>
                    
                    <option v-for="type in identificationType" :key="type.value" :value="type.value">
                        {{ type.text }}
                    </option>
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