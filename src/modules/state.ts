import { ref} from "vue";

export const show = ref(!!localStorage.getItem('token'));