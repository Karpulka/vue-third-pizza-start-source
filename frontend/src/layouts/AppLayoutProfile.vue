<template>
  <main class="layout">
    <AppSidebar />
    <div class="layout__content">
      <slot />
    </div>
  </main>
</template>

<script setup>
import AppSidebar from "./AppSidebar.vue";
</script>

<style lang="scss" scoped>
.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}
</style>
