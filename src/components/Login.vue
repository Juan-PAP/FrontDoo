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

const formRef = ref<HTMLFormElement | null>(null)

const errorMessage = ref("");
const isLoading = ref(false);

function validate(){
    return formRef.value?.reportValidity()
}

async function send () {
    errorMessage.value = "";

    if (!validate()){
        return console.log("Error de validación HTML5 (ej. campo vacío)")
    }

    if (form.user.trim().length < 4) {
        errorMessage.value = "El usuario debe tener al menos 4 caracteres sin espacios.";
        setTimeout(() => (errorMessage.value = ""), 3000);
        return; // Detenemos el envío
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
        <form ref="formRef" @submit.prevent="send" class="col-4">
            <div>
                <h1 class="title mb-5 text-center">Inicio de sesión</h1>
            </div>
            <div class="form-floating mb-4">
                <input v-model.trim="form.user" type="text" class="form-control" minlength="4" maxlength="20"  required id="floatingUsername" placeholder="" :disabled="isLoading"> <label for="floatingUsername">Usuario</label>
            </div>
            <div class="form-floating mb-4">
                <input v-model="form.password" type="password" class="form-control" minlength="8" maxlength="12" required id="floatingPassword" placeholder="" :disabled="isLoading"> <label for="floatingPassword">Contraseña</label>
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
/* Tus estilos (sin cambios) */
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