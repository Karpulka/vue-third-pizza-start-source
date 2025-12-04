<template>
  <div v-if="ingredients && ingredients.length" class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="`ingredient-${ingredient.id}`"
        class="ingredients__item"
      >
        <!-- Компонент AppDrag определяет какой ингредиент перемещается -->
        <app-drag :data-transfer="ingredient" draggable>
          <span class="filling" :class="`filling--${ingredient.alias}`">{{
            ingredient.name
          }}</span>

          <AppCounter
            v-model="ingredientsCount[ingredient.alias].value"
            :min-value="0"
            :max-value="maxIngredientsCount"
            :is-input-disabled="
              ingredientsCount[ingredient.alias].isInputDisable
            "
            :class="`ingredients__counter`"
            @on-change-count="
              onChangeCount(
                ingredientsCount[ingredient.alias].value,
                ingredient.alias
              )
            "
          />
        </app-drag>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";

import AppCounter from "@/common/components/AppCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

const maxIngredientsCount = 3;

const props = defineProps({
  ingredients: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const filteredIngredients = defineModel({ type: Array, default: () => [] });

const ingredientsCount = computed(() => {
  const result = {};

  props.ingredients.forEach((ingredient) => {
    const value = filteredIngredients.value.filter(
      (element) => element === ingredient.alias
    ).length;
    result[ingredient.alias] = {
      value,
      isInputDisable: false,
    };
  });

  return result;
});

const onChangeCount = (count, ingredient) => {
  let lastIndex = -1;
  const ingredientsAlreadyAdded = filteredIngredients.value.filter(
    (element, index) => {
      lastIndex = element === ingredient ? index : lastIndex;
      return element === ingredient;
    }
  );
  if (ingredientsAlreadyAdded.length > count) {
    filteredIngredients.value.splice(lastIndex, 1);
  } else {
    filteredIngredients.value.push(ingredient);
  }
};

defineEmits(["drop"]);
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
