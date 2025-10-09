<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { show } from './modules/state';

</script>

<template>

  <Navbar class="position-relative overflow" v-if ="show"></Navbar>

  <div class="no-scroll-x">
    <RouterView ></RouterView>
  </div>

</template>

<style scoped>
.no-scroll-x {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>