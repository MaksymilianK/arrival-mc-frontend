<template>
  <h2 v-if="player" class="section-title">{{ player.nick }}</h2>
  <div v-if="player" class="profile-container">
    <img :src="'https://minotar.net/avatar/' + player.nick" alt="Twarz gracza" class="face">
    <dl class="info">
      <dt class="term">Ranga</dt>
        <dd class="value" v-html="formattedRank(player.rank.displayName)"></dd>
      <dt class="term">Pierwsze logowanie</dt>
        <dd class="value">{{ createdFormat }}</dd>
      <dt class="term">Ostatnio na serwerze</dt>
        <dd class="value">{{ lastOnlineFormat }}</dd>
    </dl>
  </div>
  <div v-if="player" class="profile-button-container last">
    <BaseButton v-if="current" :is-link="true" to="/gracze/mixdu" icon="email" class="profile-button-active profile-message-button">Wiadomość</BaseButton>
    <BaseButton v-else :is-link="true" to="#" icon="drafts" class="profile-button-active">Wiadomości</BaseButton>
    <BaseButton :is-link="true" to="#" icon="do_not_touch" class="profile-button-active">Bany Gracza</BaseButton>
    <BaseButton :is-link="true" to="#" icon="report" class="profile-button-active profile-ban-button">Zbanuj gracza</BaseButton>
  </div>
</template>

<script>
  import BaseButton from "../base/button/BaseButton";
  import { playerService } from '@/services/playerService';
  import {ref, watchEffect} from 'vue';
  import {onBeforeRouteLeave, useRoute} from "vue-router";
  import {authService} from "@/services/authService";
  import {formattedRank} from "@/formatters/formattedRank";

  export default {
    components: {BaseButton},

    setup() {
      const route = useRoute();

      const stop = watchEffect(
          () => search(route.params.id)
      );

      onBeforeRouteLeave(stop);

      return {
        player,
        current,
        formattedRank
      }
    }
  }

  const player = ref({
    id: 0,
    nick: '',
    rank: {
      displayName: ''
    }
  });
  const current = authService.current;

  function search(id) {
    playerService.getProfile(id)
      .then(res => {
        player.value = res;
        console.log(player.value)
      })
      .catch(err => console.log(err));
  }
</script>

<style scoped>
  .profile-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .face {
    width: 50vw;
    height: 50vw;
    max-width: 300px;
    max-height: 300px;
    display: block;
    border: 3px solid #636363;
    border-radius: 20%;
  }

  .term {
    color: #a7a6a6;
  }

  .value {
    color: #636363;
    margin: 0 0 1rem 0;
  }

  .value:last-child {
    margin: 0;
  }

  .info {
    font-size: 1.3rem;
    margin: 2rem 0;
    text-align: center;
  }

  .profile-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  >>> .profile-button-active {
    margin: 0.8rem 0;
    font-size: 0.8rem;
  }

  >>> .profile-message-button {
    background-color: #4a46a1;
  }

  >>> .profile-message-button:hover, .profile-message-button:focus {
    background-color: #2f2c6c;
  }

  >>> .profile-ban-button {
    background-color: #cb5400;
  }

  >>> .profile-ban-button:hover, .profile-ban-button:focus {
    background-color: #742b00;
  }

  @media (min-width: 768px) {
    .profile-container {
      flex-direction: row;
      margin: 0 auto;
    }

    .info {
      margin: 0 0 0 3em;
    }

    .face {
      width: 30vw;
      height: 30vw;
      margin: 0;
    }

    .profile-button-container {
      padding: 0 18vw;
      flex-direction: row;
      justify-content: space-evenly;
      margin-top: 4em;
    }
  }

  @media (min-width: 992px) {
    .info {
      font-size: 1.5rem;
    }

    .profile-button-active {
      font-size: 0.9rem;
    }
  }

  @media (min-width: 1600px) {
    .info {
      font-size: 1.7rem;
    }

    .profile-button-active {
      font-size: 1rem;
    }

    .profile-button-container {
      margin-top: 5em;
    }
  }
</style>
