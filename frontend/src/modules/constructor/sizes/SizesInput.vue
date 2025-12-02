<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div v-if="sizes && sizes.length" class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="`size-${size.id}`"
          class="diameter__input"
          :class="`diameter__input--${size.alias}`"
        >
          <input
            v-model="pizzaSelectedAlias"
            type="radio"
            name="diameter"
            :value="size.alias"
            class="visually-hidden"
            @change="changePizzaSize"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sizes: {
    type: Array,
    default: () => [],
  },
});

const pizzaSelectedAlias = defineModel({
  type: String,
});

const changePizzaSize = (e) => {
  if (pizzaSelectedAlias.value === e.target.value) {
    return;
  }

  pizzaSelectedAlias.value = e.target.value;
};
</script>

<style lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/ds-system/ds-typography";
@use "@/assets/scss/mixins/m_center";

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include ds-typography.r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include m_center.p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: ds-colors.$green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: ds-shadows.$shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: ds-shadows.$shadow-large;
    }
  }
}
</style>
