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
          <div class="cart__additional">
            <!-- <ul class="additional-list">
            <li class="additional-list__item sheet">
              <p class="additional-list__description">
                <img
                  src="img/cola.svg"
                  width="39"
                  height="60"
                  alt="Coca-Cola 0,5 литра"
                />
                <span>Coca-Cola 0,5 литра</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <button
                    type="button"
                    class="counter__button counter__button--minus"
                  >
                    <span class="visually-hidden">Меньше</span>
                  </button>
                  <input
                    type="text"
                    name="counter"
                    class="counter__input"
                    value="2"
                  />
                  <button
                    type="button"
                    class="counter__button counter__button--plus counter__button--orange"
                  >
                    <span class="visually-hidden">Больше</span>
                  </button>
                </div>

                <div class="additional-list__price">
                  <b>× 56 ₽</b>
                </div>
              </div>
            </li>
            <li class="additional-list__item sheet">
              <p class="additional-list__description">
                <img
                  src="img/sauce.svg"
                  width="39"
                  height="60"
                  alt="Острый соус"
                />
                <span>Острый соус</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <button
                    type="button"
                    class="counter__button counter__button--minus"
                  >
                    <span class="visually-hidden">Меньше</span>
                  </button>
                  <input
                    type="text"
                    name="counter"
                    class="counter__input"
                    value="2"
                  />
                  <button
                    type="button"
                    class="counter__button counter__button--plus counter__button--orange"
                  >
                    <span class="visually-hidden">Больше</span>
                  </button>
                </div>

                <div class="additional-list__price">
                  <b>× 30 ₽</b>
                </div>
              </div>
            </li>
            <li class="additional-list__item sheet">
              <p class="additional-list__description">
                <img
                  src="img/potato.svg"
                  width="39"
                  height="60"
                  alt="Картошка из печи"
                />
                <span>Картошка из печи</span>
              </p>

              <div class="additional-list__wrapper">
                <div class="counter additional-list__counter">
                  <button
                    type="button"
                    class="counter__button counter__button--minus"
                  >
                    <span class="visually-hidden">Меньше</span>
                  </button>
                  <input
                    type="text"
                    name="counter"
                    class="counter__input"
                    value="2"
                  />
                  <button
                    type="button"
                    class="counter__button counter__button--plus counter__button--orange"
                  >
                    <span class="visually-hidden">Больше</span>
                  </button>
                </div>

                <div class="additional-list__price">
                  <b>× 56 ₽</b>
                </div>
              </div>
            </li>
          </ul> -->
          </div>

          <div class="cart__form"></div>
        </template>
      </div>
    </main>
    <cart-footer :total="totalPrice" />
  </form>
</template>

<script setup>
import { ref } from "vue";
import CartFooter from "@/modules/cart/CartFooter.vue";
import CartList from "@/modules/cart/CartList.vue";
import pizzas from "@/mocks/pizzas.json";

// defineProps({
//   pizzas: {
//     type: Array,
//     default: () => [],
//   },
// });

const totalPrice = ref(0);

const onChangePizzas = (sum) => {
  totalPrice.value = sum;
};
</script>

<style lang="scss">
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
</style>
