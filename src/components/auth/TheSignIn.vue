<template>
  <article>
    <h2 class="section-title">Logowanie</h2>
    <form class="form" @submit="signIn">
      <BaseInput
          type="text"
          label="Nick"
          placeholder="np. MiXdu"
          v-model="nick"
          :validator="validateNick"
      ></BaseInput>
      <BaseInput
          type="password"
          label="Hasło"
          v-model="password"
          :validator="validatePassword"
      ></BaseInput>
      <BaseOutlinedButton type="submit">Zaloguj</BaseOutlinedButton>
      <span v-if="error" class="error">{{ error }}</span>
    </form>
  </article>
</template>

<script>
import BaseOutlinedButton from "../base/button/BaseOutlinedButton";
import BaseInput from "../base/form/BaseInput";
import {ref} from "vue";
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

const errorWrongNick = 'Gracz o podanym nicku nie istnieje!';
const errorWrongPassword = 'Hasło jest niepoprawne!';
const unexpectedError = 'Niespodziewany błąd. Sprawdź swoje połączenie internetowe!';

function signInHelpers() {
  const nickRegex = /^\w{3,16}$/;

  const nick = ref('');
  const password = ref('');
  const router = useRouter();

  const error = ref('');

  function validateNick() {
    if (nickRegex.test(nick.value)) {
      return '';
    } else {
      return 'Nieprawidłowy nick!';
    }
  }

  function validatePassword() {
    if (password.value.length >= 6 && password.value.length <= 50) {
      return '';
    } else {
      return 'Nieprawidłowe hasło!';
    }
  }

  function signIn(event) {
    event.preventDefault();
    document.activeElement.blur();
    if (validateNick() || validatePassword()) {
      return;
    }

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
        });
  }

  return {error, nick, password, validateNick, validatePassword, signIn}
}
</script>

<style scoped>
  .error {
    color: #dd0000;
  }
</style>