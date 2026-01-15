<template>
  <div>
    <app-header v-if="!$route.meta.isHeaderHidden" />
    <slot />
  </div>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>
