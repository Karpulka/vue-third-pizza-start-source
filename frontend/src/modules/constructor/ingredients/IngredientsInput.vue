<template>
  <div v-if="ingredients && ingredients.length" class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="`ingredient-${ingredient.id}`"
        class="ingredients__item"
      >
        <span class="filling" :class="`filling--${ingredient.alias}`">{{
          ingredient.name
        }}</span>

        <AppCounter
          v-model="ingredientsCount[ingredient.alias].value"
          :min-value="0"
          :max-value="maxIngredientsCount"
          :is-input-disabled="ingredientsCount[ingredient.alias].isInputDisable"
          :class="`ingredients__counter`"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

import AppCounter from "@/common/components/AppCounter.vue";

const maxIngredientsCount = 3;

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const ingredientsCount = reactive({});

props.ingredients.forEach((ingredient) => {
  ingredientsCount[ingredient.alias] = {
    value: 0,
    isInputDisable: false,
  };
});

const emit = defineEmits("onUpdateSelectedIngredients");

watch(ingredientsCount, () => {
  const ingredients = Object.keys(ingredientsCount);
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredientsCount[ingredient].value > 0
  );
  emit("onUpdateSelectedIngredients", filteredIngredients);
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;
@use "@/assets/scss/ds-system/ds-shadows" as *;
@use "@/assets/scss/mixins/m_center" as *;
@use "@/assets/scss/mixins/m_clear-list" as *;
@use "@/assets/scss/visually-hidden" as *;

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("@/assets/img/filling/salmon.svg");
  }
}
</style>
