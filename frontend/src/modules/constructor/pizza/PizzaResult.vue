<template>
  <app-drop>
    <AppInput
      v-model="pizzaName"
      :title="`Название пиццы`"
      :input-name="`pizza_name`"
      :placeholder="`Введите название пиццы`"
      @update="emit('update:modelValue', event)"
    />
    <div class="content__constructor">
      <div class="pizza" :class="pizzaClass">
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, index) in resultIngredients"
            :key="`${ingredient.alias}-${index}`"
            class="pizza__filling"
            :class="`pizza__filling--${ingredient.alias} ${ingredient.class}`"
          ></div>
        </div>
      </div>
    </div>
  </app-drop>
</template>

<script setup>
import { computed } from "vue";

import AppInput from "@/common/components/AppInput.vue";
import AppDrop from "@/common/components/AppDrop.vue";

import { INGREDIENTS_COUNT_CLASSES } from "@/common/constants";

const pizzaClassPrefix = "pizza--foundation";

const pizzaName = defineModel({ type: String });

const props = defineProps({
  dought: {
    type: String,
    required: true,
  },
  sauce: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    default: () => [],
  },
});

const pizzaClass = computed(() => {
  return `${pizzaClassPrefix}--${props.dought}-${props.sauce}`;
});

const resultIngredients = computed(() => {
  const result = [];

  props.ingredients.forEach((ingredient) => {
    let pizzaCountClass = "";
    const elementCount = props.ingredients.filter(
      (element) => element === ingredient
    );

    if (elementCount.length > 1) {
      pizzaCountClass += `pizza__filling--${INGREDIENTS_COUNT_CLASSES[elementCount.length]}`;
    }
    result.push({
      alias: ingredient,
      class: pizzaCountClass,
    });
  });

  return result;
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss">
@use "@/assets/scss/ds-system/ds-typography" as *;
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--light-creamy {
    background-image: url("@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--light-tomato {
    background-image: url("@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: "";

    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;

      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;

      transform: rotate(45deg);
    }

    &::after {
      display: block;

      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/parmesan.svg");
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("@/assets/img/filling-big/tomatoes.svg");
  }
}
</style>
