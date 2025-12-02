<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isMinusBtnDisabled"
      @click="decrementIngredientCount"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      v-model="counterValue"
      type="text"
      name="counter"
      class="counter__input"
      :disabled="isInputDisabled"
      @input="inputValidate"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="isPlusBtnDisabled"
      @click="incrementIngredientCount"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  isInputDisabled: { type: Boolean, required: false },
  minValue: {
    type: Number,
    required: false,
    default: NaN,
  },
  maxValue: {
    type: Number,
    required: false,
    default: NaN,
  },
});

let counterValue = ref(0, {
  type: Number,
  default: 0,
});

const isMinusBtnDisabled = computed(() => {
  if (props.minValue || props.minValue === 0) {
    return counterValue.value === props.minValue;
  }

  return false;
});

const isPlusBtnDisabled = computed(() => {
  if (props.maxValue) {
    return counterValue.value >= props.maxValue;
  }

  return false;
});

const incrementIngredientCount = () => {
  counterValue.value++;
};

const decrementIngredientCount = () => {
  counterValue.value--;
};

const inputValidate = (e) => {
  const value = parseInt(e.target.value.trim(), 10);

  if (!value || value <= 0) {
    counterValue.value = 0;
  }

  if (value > 3) {
    counterValue.value = 3;
  }
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;
@use "@/assets/scss/ds-system/ds-shadows" as *;
@use "@/assets/scss/mixins/m_center" as *;

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
