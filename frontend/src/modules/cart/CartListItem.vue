<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        :src="getImageUrl('img/product.svg')"
        class="product__img"
        width="56"
        height="56"
        :alt="name"
      />
      <div class="product__text">
        <h2>{{ name }}</h2>
        <ul>
          <li>{{ sizeName }}, на {{ doughtName }} тесте</li>
          <li>Соус: {{ sauceName }}</li>
          <li>Начинка: {{ ingredientsInfo }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input type="text" name="counter" class="counter__input" value="1" />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div v-if="price" class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit">Изменить</button>
    </div>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { getImageUrl, getParamName } from "@/common/helpers";

import doughTypesData from "@/mocks/dough.json";
import sizesData from "@/mocks/sizes.json";
import saucesData from "@/mocks/sauces.json";
import ingredientsData from "@/mocks/ingredients.json";
import ingredientsAliases from "@/common/data/ingredients";
import saucesAliases from "@/common/data/sauces";
import sizesAliases from "@/common/data/sizes";
import doughAliases from "@/common/data/doughSizes";

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
  dought: {
    type: String,
    required: true,
    default: "",
  },
  size: {
    type: String,
    required: true,
    default: "",
  },
  sauce: {
    type: String,
    required: true,
    default: "",
  },
  ingredients: {
    type: Array,
    required: true,
    default: () => {},
  },
  price: {
    type: Number,
    required: true,
    default: null,
  },
});

const doughtName = computed(() => {
  return getParamName(props.dought.value, doughAliases, doughTypesData);
});

const sizeName = computed(() => {
  return getParamName(props.size.value, sizesAliases, sizesData);
});

const sauceName = computed(() => {
  return getParamName(props.sauce.value, saucesAliases, saucesData);
});

const ingredientsInfo = computed(() => {
  return props.ingredients.value.reduce((result, ingredient) => {
    const ingredientName = getParamName(
      ingredient,
      ingredientsAliases,
      ingredientsData
    );

    if (result.length && ingredientName.length) {
      result += ", ";
    }

    return (result += ingredientName);
  }, "");
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba(ds-colors.$green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include ds-typography.b-s16-h19;
  }
}

.cart-list__edit {
  @include ds-typography.l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: ds-colors.$green-500;
  }

  &:active {
    color: ds-colors.$green-600;
  }

  &:focus {
    color: ds-colors.$green-400;
  }
}
</style>
