<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="getImageUrl(image)" width="39" height="60" :alt="name" />
      <span>{{ name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <app-counter
        v-model="productCount"
        :class="`additional-list__counter`"
        :min-value="0"
        :color-version="'orange'"
        @on-change-count="$emit('update:quantity', productCount)"
      />

      <div class="additional-list__price">
        <b>× {{ price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref } from "vue";
import AppCounter from "@/common/components/AppCounter.vue";
import { getImageUrl } from "@/common/helpers";

defineProps({
  name: {
    type: String,
    required: true,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const productCount = ref(0);

defineEmits(["update:quantity"]);
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include ds-typography.b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba(ds-colors.$green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include ds-typography.b-s16-h19;
}
</style>
