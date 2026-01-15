<template>
  <ul class="cart-list sheet">
    <cart-list-item
      v-for="pizza in pizzas"
      :key="`pizza-item-${pizza.id}`"
      {...pizza}
    />
  </ul>
</template>

<script setup>
import CartListItem from "@/modules/cart/CartListItem.vue";

defineProps({
  pizzas: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss">
@use "@/assets/scss/mixins/m_clear-list";

.cart-list {
  @include m_clear-list.clear-list;

  padding: 15px 0;
}
</style>
