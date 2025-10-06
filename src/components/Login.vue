<script setup lang="ts">
import { reactive, ref } from 'vue';
import { show } from '../modules/state';

interface Login {
    username: string;
    password: string;
}
const form = reactive ({
    username: "",
    password: ""
});

const formRef = ref<HTMLFormElement | null>(null)

const errors = reactive ({
    username: "",
    password: ""
});

function validate(){
    return formRef.value?.checkValidity()
}

function send () {
    if (!validate()){
        return console.log("error")
    }
    show.value = true;

    console.log("Formulario valido: ", form.password, form.username)
}


</script>

<template>
    <div class="row d-flex justify-content-center my-5">
        <form ref="formRef" @submit.prevent="send" class="col-4">
        <div>
            <h1 class="title mb-5 text-center">Inicio de sesión</h1>
        </div>
        <div class="form-floating mb-4">
            <input v-model="form.username" type="text" class="form-control" minlength="4" maxlength="20" required id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Usuario</label>
        </div>
        <div v-if="errors.username" class="text-danger small mb-3">
            {{ errors.username }}
        </div>
        <div class="form-floating mb-4">
            <input v-model="form.password" type="password" class="form-control" minlength="8" maxlength="12" required id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Contraseña</label>
        </div>
        <div v-if="errors.password" class="text-danger small mb-3">
            {{ errors.password }}
        </div>
        <div class="form-text mb-4 fw-bold text-center" >Ingresa tus credenciales para iniciar sesión en <span class="aurora fw-bold">Aurora</span></div>
        <div class="d-flex justify-content-center mt-4">
            <button type="submit" class="btn btn-primary mb-3 ">Iniciar sesion</button>
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