<template>
  <label class="input">
    <span v-if="title" :class="{ 'visually-hidden': !isTitle }">{{
      title
    }}</span>
    <input
      :value="modelValue"
      :type="inputType"
      :name="inputName"
      :placeholder="placeholder"
      :required="isRequired"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  inputName: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    default: "text",
  },
  isTitle: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@use "@/assets/scss/visually-hidden" as *;
@use "@/assets/scss/ds-system/ds-typography" as *;
@use "@/assets/scss/ds-system/ds-colors" as *;

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
