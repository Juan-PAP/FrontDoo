<script setup lang="ts">
import { reactive, ref } from 'vue';
import { show } from '../modules/state';
import router from '../router';
import type { LoginInterface } from './interfaces/Login';
import { login } from '../services/service-login'; 

const form:LoginInterface = reactive ({
    user: "",
    password: ""
});

const errors = reactive({
    user: "",
    password: ""
});

const formRef = ref<HTMLFormElement | null>(null)
const errorMessage = ref("");
const isLoading = ref(false);

function validate(): boolean {

    errors.user = "";
    errors.password = "";
    
    let isValid = true;

    if (!form.user) {
        errors.user = "El campo usuario es requerido.";
        isValid = false;
    } else if (form.user.length < 4) {
        errors.user = "El usuario debe tener al menos 4 caracteres.";
        isValid = false;
    }

    if (!form.password) {
        errors.password = "El campo contraseña es requerido.";
        isValid = false;
    } else if (form.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres.";
        isValid = false;
    }

    return isValid;
}

async function send () {
    errorMessage.value = "";

    if (!validate()){
        return;
    }
    isLoading.value = true; 

    const payload = {
        user: form.user.trim(),
        password: form.password
    };

    const response = await login(payload); 
    
    isLoading.value = false;

    if (response.success) {

        router.push({ name: 'home' });

        show.value = true;

    } else {
    
        errorMessage.value = response.error || "Error desconocido.";
        setTimeout(() => (errorMessage.value = ""), 3000);
    }
}
</script>

<template>
    <div class="row d-flex justify-content-center my-5">
        <form ref="formRef" @submit.prevent="send" class="col-4" novalidate>
            <div>
                <h1 class="title mb-5 text-center">Inicio de sesión</h1>
            </div>
            <div class="form-floating mb-4">
                <input v-model.trim="form.user" type="text" :class="['form-control', { 'is-invalid': errors.user }]" minlength="4" maxlength="20"  required id="floatingUsername" placeholder="" :disabled="isLoading"> <label for="floatingUsername">Usuario</label>
                <div v-if="errors.user" class="invalid-feedback">
                    {{ errors.user }}
                </div>
            </div>
            <div class="form-floating mb-4">
                <input v-model="form.password" type="password" :class="['form-control', { 'is-invalid': errors.password }]" minlength="8" maxlength="12" required id="floatingPassword" placeholder="" :disabled="isLoading"> <label for="floatingPassword">Contraseña</label>
                <div v-if="errors.password" class="invalid-feedback">
                    {{ errors.password }}
                </div>
            </div>

            <div class=" mb-5 text-center" >Ingresa tus credenciales para iniciar sesión en <span class="aurora fw-bold" placeholder="">Aurora</span></div>
            
            <div class="d-flex justify-content-center mt-4 col-12">
                <button type="submit" class="btn btn-primary mb-3" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">{{ isLoading ? 'Iniciando...' : 'Iniciar sesion' }}</span>
                </button>
            </div>
            
            <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
            {{ errorMessage }}
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
.form-floating .invalid-feedback {
    display: block;
    width: 100%;
}
</style>