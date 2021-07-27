<template>
  <h2 class="section-title">Logowanie</h2>
  <form class="form" @submit="signIn" ref="form">
    <BaseInput
        type="text"
        label="Nick"
        placeholder="np. MiXdu"
        v-model="nick"
        :validator="validateNick"
        error="Nieprawidłowy nick!"
    ></BaseInput>
    <BaseInput
        type="password"
        label="Hasło"
        v-model="password"
        :validator="validatePassword"
        error="Nieprawidłowe hasło!"
    ></BaseInput>
    <BaseOutlinedButton type="submit">Zaloguj</BaseOutlinedButton>
    <span v-if="error" class="error">{{ error }}</span>
  </form>
</template>

<script>
import BaseOutlinedButton from "../base/button/BaseOutlinedButton";
import BaseInput from "../base/form/BaseInput";
import {ref, watch} from "vue";
import {authService} from "../../services/auth-service";
import {useRouter} from "vue-router";
import {httpNotFound, httpUnauthorized} from "../../models/http-codes";

export default {
  name: "TheSignIn",
  components: {BaseInput, BaseOutlinedButton},

  setup() {
    return signInHelpers();
  }
}

const errorNotComplete = 'Uzupełnij wszystkie pola!';
const errorWrongNick = 'Gracz o podanym nicku nie istnieje!';
const errorWrongPassword = 'Hasło jest niepoprawne!';
const unexpectedError = 'Niespodziewany błąd. Sprawdź swoje połączenie internetowe!';

function signInHelpers() {
  const form = ref({checkValidity: () => true});
  const error = ref('');

  const nickRegex = /^\w{3,16}$/;

  const nick = ref('');
  const password = ref('');
  const router = useRouter();

  function validateNick(nick) {
    return nick && nickRegex.test(nick);
  }

  function validatePassword(pass) {
    return pass && pass.length >= 6 && pass.length <= 50;
  }

  watch(
      () => [nick.value, password.value],
      () => error.value = ''
  )

  function signIn(event) {
    event.preventDefault();

    if (!nick.value || !password.value) {
      error.value = errorNotComplete;
      return;
    }

    if (form.value.checkValidity()) {
      authService.signIn(nick.value, password.value)
          .then(() => router.push({name: 'home'}))
          .catch(err => {
            console.log(err);
            if (Number.isInteger(err)) {
              switch (err) {
                case httpNotFound: error.value = errorWrongNick; break;
                case httpUnauthorized: error.value = errorWrongPassword; break;
                default: error.value = unexpectedError; break;
              }
            } else {
              error.value = unexpectedError;
            }
          })
    }
  }

  return {form, error, nick, password, validateNick, validatePassword, signIn}
}
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .error {
    color: #dd0000;
  }
</style>