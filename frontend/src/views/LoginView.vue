<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="#" method="post">
      <div class="sign-form__input">
        <app-input
          v-model="email"
          :title="'E-mail'"
          :input-name="'email'"
          :placeholder="'example@mail.ru'"
          :input-type="'email'"
          is-title
        />
      </div>

      <div class="sign-form__input">
        <app-input
          v-model="password"
          :title="'Пароль'"
          :input-name="'pass'"
          :placeholder="'***********'"
          :input-type="'password'"
          is-title
        />
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AppInput from "@/common/components/AppInput.vue";

const email = ref("");
const password = ref("");
</script>

<style lang="scss">
@use "@/assets/scss/ds-system/ds-colors";
@use "@/assets/scss/ds-system/ds-shadows";
@use "@/assets/scss/mixins/m_center";

.sign-form {
  @include m_center.pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: ds-colors.$white url("@/assets/img/popup.svg") no-repeat center
    top;
  box-shadow: ds-shadows.$shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}
</style>
