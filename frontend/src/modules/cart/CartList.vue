<template>
  <ul class="cart-list sheet">
    <cart-list-item
      v-for="pizza in list"
      :key="`pizza-item-${pizza.id}`"
      v-bind="{ ...pizza }"
      @on-change-pizza-count="onChangeCount($event, pizza.id)"
    />
  </ul>
</template>

<script setup>
import { ref, watch, useId } from "vue";
import CartListItem from "@/modules/cart/CartListItem.vue";

const emit = defineEmits(["onChangePizzas"]);

const props = defineProps({
  pizzas: {
    type: Array,
    default: () => [],
  },
});

const list = ref([]);

const onChangeCount = (count, pizzaId) => {
  if (!count) {
    const pizzaIndex = list.value.findIndex((item) => item.id === pizzaId);
    list.value.splice(pizzaIndex, 1);
  } else {
    list.value.find((item) => item.id === pizzaId).count = count;
  }
  const total = list.value.reduce((acc, item) => {
    return acc + item.count * item.price;
  }, 0);

  emit("onChangePizzas", total);
};

watch(
  () => props.pizzas,
  (newPizzas) => {
    newPizzas.forEach((pizza, index) => {
      if (!list.value[index]) {
        list.value.push({
          ...pizza,
          count: 1,
          id: useId(),
        });
      }
    });

    const total = list.value.reduce((acc, item) => {
      return acc + item.count * item.price;
    }, 0);

    emit("onChangePizzas", total);
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use "@/assets/scss/mixins/m_clear-list";

.cart-list {
  @include m_clear-list.clear-list;

  padding: 15px 0;
}
</style>
