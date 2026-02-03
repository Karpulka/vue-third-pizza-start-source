<template>
  <app-header v-if="!$route.meta.isHeaderHidden" />
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import AppLayout from "@/layouts/AppLayout.vue";
import AppHeader from "@/layouts/AppHeader.vue";
</script>

<style lang="scss"></style>
