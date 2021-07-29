<template>
  <article class="section">
    <h2 class="section-title">Profil gracza</h2>
    <section class="main-container">
      <img v-if="player.nick" :src="`https://minotar.net/avatar/${player.nick}`" alt="" class="face-img">
      <dl class="non-styled-dictionary player-info">
        <dt class="player-info-name">Nick</dt>
          <dd class="player-info-val">{{player.nick}}</dd>
        <dt class="player-info-name">Ranga</dt>
          <dd class="player-info-val">
            <BaseFormatted v-if="ranks.has(player.rank)" :display="ranks.get(player.rank).displayName"></BaseFormatted>
          </dd>
      </dl>
    </section>
    <section class="main-container">
      <BaseButton v-if="authService.hasPerm('ban.give')" :to="`bany/nowy?nick=${player.nick}`">Zbanuj gracza</BaseButton>
    </section>
  </article>
</template>

<script>
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import {playerService} from "../../services/player-service";
import {Player} from "../../models/player";
import BaseFormatted from "../base/BaseFormatted";
import {rankService} from "../../services/rank-service";
import BaseButton from "../base/button/BaseButton";
import {authService} from "../../services/auth-service";

export default {
  name: "ThePlayerProfile",
  components: {BaseButton, BaseFormatted},
  setup() {
    const player = reactive(new Player());

    const route = useRoute();

    onMounted(() => loadPlayer(route.params.nick));
    onBeforeRouteUpdate((to, from) => {
      if (to.params.nick !== from.params.nick) {
        loadPlayer(to.params.nick);
      }
    });

    function loadPlayer(nick) {
      playerService.getPlayer(nick)
          .then(res => player.update(res.data))
          .catch(console.log);
    }

    return {
      player,
      ranks: rankService.ranks,
      authService
    }
  }
}
</script>

<style scoped>
  .section {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 5rem;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5rem;
  }

  .face-img {
    width: 15rem;
    border: 0.3rem solid #a7a6a6;
    border-radius: 2rem;
  }

  .player-info {
    font-size: 1.5rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 0.5rem;
  }

  .player-info-name::after {
    content: ': ';
    white-space: break-spaces;
  }

  @media(min-width: 1200px) {
    .main-container {
      flex-direction: row;
    }
  }
</style>