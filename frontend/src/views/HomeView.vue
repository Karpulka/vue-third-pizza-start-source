<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>

      <!-- Выбор теста -->
      <DoughTypes
        v-if="normalizeDoughTypes && normalizeDoughTypes.length"
        v-model="doughSelected"
        :dough-types="normalizeDoughTypes"
      />

      <!-- Выбор размера пиццы -->
      <SizesInput
        v-if="sizes && sizes.length"
        v-model="pizzaSeletedSize"
        :sizes="normalizeSizes"
      />

      <div class="content__ingredients">
        <div class="sheet">
          <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

          <div class="sheet__content ingredients">
            <!-- Выбор соуса -->
            <SaucesInput v-model="selectedSauce" :sauces="normalizeSauces" />

            <!-- Выбор ингредиентов -->
            <IngredientsInput
              v-model="selectedIngredients"
              :ingredients="normalizeIngredients"
            />
          </div>
        </div>
      </div>
      <!-- Блок с пиццей -->
      <div class="content__pizza">
        <PizzaResult
          v-model="pizzaName"
          :dought="doughSelected"
          :sauce="selectedSauce"
          :ingredients="selectedIngredients"
          @drop="moveIngredient"
        />

        <div class="content__result">
          <p>Итого: {{ price }} ₽</p>
          <button type="button" class="button" :disabled="isResultBtnDisabled">
            Готовьте!
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, ref } from "vue";

import DoughTypes from "@/modules/constructor/dough/DoughTypes.vue";
import SizesInput from "@/modules/constructor/sizes/SizesInput.vue";
import SaucesInput from "@/modules/constructor/sauces/SaucesInput.vue";
import IngredientsInput from "@/modules/constructor/ingredients/IngredientsInput.vue";
import PizzaResult from "@/modules/constructor/pizza/PizzaResult.vue";

import doughTypesData from "@/mocks/dough.json";
import sizes from "@/mocks/sizes.json";
import sauces from "@/mocks/sauces.json";
import ingredients from "@/mocks/ingredients.json";
import { addAliasToData, getMaxPizzaAlias } from "@/common/helpers";
import ingredientsAliases from "@/common/data/ingredients";
import saucesAliases from "@/common/data/sauces";
import sizesAliases from "@/common/data/sizes";
import doughAliases from "@/common/data/doughSizes";

import { MAX_INGREDIENTS_COUNT } from "@/common/constants";

const normalizeDoughTypes = ref(addAliasToData(doughAliases, doughTypesData));

const doughSelected = ref(normalizeDoughTypes.value[0].alias);

const normalizeSauces = ref(addAliasToData(saucesAliases, sauces));
const sauceSelected =
  normalizeSauces.value && normalizeSauces.value.length
    ? normalizeSauces.value[0].alias
    : "";
const selectedSauce = ref(sauceSelected);

const selectedIngredients = ref([]);

const normalizeSizes = ref(addAliasToData(sizesAliases, sizes));

const pizzaSeletedSize = ref(getMaxPizzaAlias(normalizeSizes.value));

const normalizeIngredients = computed(() => {
  return addAliasToData(ingredientsAliases, ingredients);
});

const pizzaName = ref("", { type: String });

const resultPizza = computed(() => {
  return {
    name: pizzaName.value,
    dought: doughSelected,
    size: pizzaSeletedSize,
    sauce: selectedSauce,
    ingredients: selectedIngredients.value.reduce((acc, item) => {
      if (acc[item]) {
        acc[item]++;
      } else {
        acc[item] = 1;
      }
      return acc;
    }, {}),
  };
});

const IngredientsPriceMap = {};
normalizeIngredients.value.forEach((ingredient) => {
  IngredientsPriceMap[ingredient.alias] = ingredient.price;
});

const price = computed(() => {
  let result = 0;

  const sizeMultiplier =
    normalizeSizes.value.find((item) => item.alias === pizzaSeletedSize.value)
      ?.multiplier ?? 1;

  const doughtPrice =
    normalizeDoughTypes.value.find((item) => item.alias === doughSelected.value)
      ?.price ?? 0;

  const saucePrice =
    normalizeSauces.value.find((item) => item.alias === selectedSauce.value)
      ?.price ?? 0;

  const ingredientsPrice = Object.keys(resultPizza.value.ingredients).reduce(
    (acc, item) =>
      acc + IngredientsPriceMap[item] * resultPizza.value.ingredients[item],
    0,
  );

  result = (doughtPrice + saucePrice + ingredientsPrice) * sizeMultiplier;

  return result;
});

const isResultBtnDisabled = computed(
  () => price.value === 0 || !resultPizza.value.name,
);

const moveIngredient = (ingredient) => {
  const ingredientsCount = selectedIngredients.value.filter(
    (element) => element === ingredient.alias,
  ).length;

  if (ingredientsCount < MAX_INGREDIENTS_COUNT) {
    selectedIngredients.value.push(ingredient.alias);
  }
};
</script>

<style lang="scss">
@use "@/assets/scss/ds-system/ds-typography" as *;

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
