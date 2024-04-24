<template>
  <div class="index_panal flex items-center justify-center">
    <div class="loaders" title="3"><LoadingAnimate /></div>
  </div>
</template>

<script setup lang="ts">
import LoadingAnimate from "@/assets/svg/LoadingAnimate.vue";

if (location.pathname === "/") {
  navigateTo("/home");
}
</script>
