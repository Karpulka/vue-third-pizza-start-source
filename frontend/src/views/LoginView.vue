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
          title="E-mail"
          input-name="email"
          placeholder="example@mail.ru"
          input-type="email"
          is-title
          @focusout="onBlur('email', email)"
        />
        <span v-if="validations.email.error" class="sign-form__error">{{
          validations.email.error
        }}</span>
      </div>

      <div class="sign-form__input">
        <app-input
          v-model="password"
          title="Пароль"
          input-name="pass"
          placeholder="***********"
          input-type="password"
          is-title
          @focusout="onBlur('password', password)"
        />
        <span v-if="validations.password.error" class="sign-form__error">{{
          validations.password.error
        }}</span>
      </div>
      <button
        type="submit"
        class="button"
        :disabled="isDisabled"
        @click.prevent="submit()"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AppInput from "@/common/components/AppInput.vue";
import { validateFields, validateSingleField } from "@/common/validator";

const email = ref("");
const password = ref("");

const validations = ref({
  email: { error: "", rules: ["required", "email"] },
  password: { error: "", rules: ["required"] },
});

const isErrors = computed(() =>
  Object.values(validations.value).some((v) => v.error),
);

const isDisabled = computed(
  () => isErrors.value || !email.value.trim() || !password.value,
);

const onBlur = (key, value) => {
  validateSingleField(key, value, validations.value);
};

const submit = () => {
  const isValid = validateFields(
    { email: email.value, password: password.value },
    validations.value,
  );
  if (!isValid) return;
  // TODO: вызов API авторизации
};
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

.sign-form__error {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  line-height: 1.2;
  color: ds-colors.$red-800;
}
</style>
