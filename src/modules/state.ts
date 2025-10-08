// src/modules/state.ts
import { ref, watch } from "vue";

// ✅ Lee del localStorage si el usuario ya estaba logueado
const savedShow = localStorage.getItem("showNavbar") === "true";

// ✅ Inicializa el estado con ese valor
export const show = ref(savedShow);

// ✅ Cada vez que cambie, lo guardamos en localStorage
watch(show, (newValue) => {
  localStorage.setItem("showNavbar", newValue.toString());
});

/*import { ref } from "vue";

export const show = ref(false);*/