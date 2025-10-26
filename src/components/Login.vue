<script setup lang="ts">
import { reactive, ref } from 'vue';
import { show } from '../modules/state';
import router from '../router';
import type { LoginInterface } from './interfaces/Login';
import { login } from '../services/service-login'; // 🔹 NUEVO: Importamos el servicio

const form:LoginInterface = reactive ({

    username: "",
    password: ""

});

const formRef = ref<HTMLFormElement | null>(null)

const errorMessage = ref("");
const isLoading = ref(false); // 🔹 NUEVO: Para feedback al usuario

function validate(){
    return formRef.value?.checkValidity()
}

// 🔸 MODIFICADO: La función 'send' ahora es 'async'
async function send () {
    errorMessage.value = "";

    if (!validate()){
        return console.log("error")
    }

    isLoading.value = true; // 🔹 Mostramos que está cargando

    // 🔸 MODIFICADO: Usamos el servicio de login
    const response = await login(form);

    isLoading.value = false; // 🔹 Dejamos de cargar

    if (response.success) {
        // El servicio ya guardó el token
        router.push({ name: 'home' });
        show.value = true;
    } else {
        // Mostramos el error que vino del servicio (quemado o real)
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
                <input v-model.trim="form.username" type="text" class="form-control" minlength="4" maxlength="20"  required id="floatingUsername" placeholder="" :disabled="isLoading"> <label for="floatingInput">Usuario</label>
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