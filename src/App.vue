<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { show } from './modules/state';

</script>

<template>

  <Navbar class="position-relative" v-if ="show"></Navbar> <!--nuevo modifique el booleano por la funcion show que tambien lo es pero esta dentro del login que maneja cierta logica para que aparezca la navbar-->
  
  <RouterView></RouterView>

  
</template>

<style scoped>
</style>