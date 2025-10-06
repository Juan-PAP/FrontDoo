<script setup lang="ts">
import { reactive, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { show } from './modules/state';
</script>

<template>

  <Navbar v-if="show"></Navbar>
  
  <RouterView></RouterView>

  
</template>

<style scoped>
</style>