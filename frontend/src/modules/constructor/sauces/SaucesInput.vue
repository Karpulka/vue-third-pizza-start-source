<template>
  <div class="ingredients__sauce" v-if="sauces && sauces.length">
    <p>Основной соус:</p>

    <AppRadioInputDefault
      v-for="sauce in sauces"
      :key="`sauce-${sauce.id}`"
      v-model="sauceSelected"
      :name="`sauce`"
      :value="sauce.alias"
      :text="sauce.name"
    />
  </div>
</template>

<script setup>
import AppRadioInputDefault from "@/common/components/AppRadioInputDefault.vue";

const props = defineProps({
  sauces: {
    type: Array,
    default: () => [],
  },
});

const sauceSelected = defineModel({ type: String, required: true });
</script>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-typography" as *;

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}
</style>
