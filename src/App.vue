<script setup lang="ts">
import {  RouterView } from 'vue-router'
import Header from './views/include/HeaderView.vue';
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
console.log(authStore.isLoggedIn)
</script>

<template>

<Header v-if="authStore.isLoggedIn"/>

  <RouterView />
</template>

<style scoped>

</style>
