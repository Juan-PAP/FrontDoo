// src/modules/state.ts
import { ref, watch } from "vue";

// ✅ Lee del localStorage si el usuario ya estaba logueado
//const savedShow = localStorage.getItem("showNavbar") === "true";

// ✅ Inicializa el estado con ese valor
export const show = ref(!!localStorage.getItem('token'));

// ✅ Cada vez que cambie, lo guardamos en localStorage
//watch(show, (newValue) => {
//  localStorage.setItem("showNavbar", newValue.toString());
//});