<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div class="sheet cart__empty" v-if="!pizzas || !pizzas.length">
          <p>В корзине нет ни одного товара</p>
        </div>
        <template v-else>
          <cart-list :pizzas="pizzas" @on-change-pizzas="onChangePizzas" />
          <div v-if="additionals" class="cart__additional">
            <ul class="additional-list">
              <AdditionalItem
                v-for="product in additionalList"
                :key="`product-${product.id}`"
                v-bind="{ ...product }"
                v-model:quantity="product.count"
              />
            </ul>
          </div>

          <div class="cart__form"></div>
        </template>
      </div>
    </main>
    <cart-footer :total="totalPrice" />
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import CartFooter from "@/modules/cart/CartFooter.vue";
import CartList from "@/modules/cart/CartList.vue";
import AdditionalItem from "@/modules/cart/AdditionalItem.vue";
import pizzas from "@/mocks/pizzas.json";
import additionals from "@/mocks/additionals.json";

// defineProps({
//   pizzas: {
//     type: Array,
//     default: () => [],
//   },
// });

const totalPizzaPrice = ref(0);

const additionalList = reactive(additionals);

const add = computed(() => {
  return additionalList.reduce(
    (acc, item) => (acc += item.count * item.price),
    0,
  );
});

const totalPrice = computed(() => {
  return totalPizzaPrice.value + add.value;
});

const onChangePizzas = (sum) => {
  totalPizzaPrice.value = sum;
};
</script>

<style lang="scss">
@use "@/assets/scss/mixins/m_clear-list";

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.additional-list {
  @include m_clear-list.clear-list;

  display: flex;
  flex-wrap: wrap;
}
</style>
