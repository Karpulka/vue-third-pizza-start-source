<template>
  <div class="layout__sidebar sidebar">
    <router-link :to="{ name: 'Home' }" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      class="layout__link"
      :exact-active-class="'layout__link--active'"
      :to="{ name: 'Orders' }"
      >История заказов</router-link
    >
    <router-link
      class="layout__link"
      :to="{ name: 'Profile' }"
      :exact-active-class="'layout__link--active'"
      >Мои данные</router-link
    >
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-typography";

.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba(ds-colors.$green-500, 0.05);
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  background-color: ds-colors.$green-500;

  img {
    display: block;

    margin: 0 auto;
  }
}

.layout__link {
  @include ds-typography.b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: ds-colors.$black;

  &--active {
    background-color: rgba(ds-colors.$green-500, 0.1);
  }

  &:hover {
    background-color: rgba(ds-colors.$green-500, 0.2);
  }

  &:active {
    color: rgba(ds-colors.$black, 0.5);
  }
}

.sidebar {
  flex-grow: 1;

  background-color: rgba(ds-colors.$green-500, 0.05);
}
</style>
