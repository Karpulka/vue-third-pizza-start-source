<template>
  <main class="content">
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
          v-model="pizzaSelectedAlias"
          :sizes="normalizeSizes"
        />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

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
        <PizzaResult
          :dought="doughSelected"
          :sauce="selectedSauce"
          :ingredients="selectedIngredients"
        />
      </div>
    </form>
  </main>
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

const normalizeDoughTypes = ref(addAliasToData(doughAliases, doughTypesData));

const doughSelected = ref(normalizeDoughTypes.value[0].alias);

const normalizeSauces = ref(addAliasToData(saucesAliases, sauces));
const sauceSelectedValue =
  normalizeSauces.value && normalizeSauces.value.length
    ? normalizeSauces.value[0].alias
    : "";
const selectedSauce = ref(sauceSelectedValue);

const normalizeSizes = computed(() => {
  return addAliasToData(sizesAliases, sizes);
});

const pizzaSelectedAlias = ref(getMaxPizzaAlias(normalizeSizes.value), {
  type: String,
});

const normalizeIngredients = computed(() => {
  return addAliasToData(ingredientsAliases, ingredients);
});

const selectedIngredients = ref([]);
</script>

<style lang="scss">
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;
@use "@/assets/scss/ds-system/ds-shadows" as *;
@use "@/assets/scss/mixins/m_center" as *;
@use "@/assets/scss/visually-hidden" as *;

.content {
  padding-top: 20px;
}

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

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}
</style>
