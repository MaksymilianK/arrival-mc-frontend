<template>
  <article class="section">
    <h2 class="section-title">Lista graczy</h2>
    <form @submit="search" class="container">
      <BaseInput
          type="text"
          label="Nick"
          placeholder="np. MiXdu"
          v-model="nick"
          :validator="validateNick"
      ></BaseInput>
      <BaseOutlinedButton type="submit">Szukaj</BaseOutlinedButton>
    </form>
    <ol class="non-styled-list player-list">
      <li v-for="p in players" :key="p.nick" class="player-item">
        <router-link :to="`/gracze/${p.nick}`" class="player-link">
          <span class="player-nick">{{ p.nick }}</span>
          <BaseFormatted v-if="ranks.has(p.rank)" :display="ranks.get(p.rank).displayName"></BaseFormatted>
        </router-link>
      </li>
    </ol>
    <BasePagination
      v-model="page"
      :total="total"
      :size="size"
      @changePage="onPageChange"
    ></BasePagination>
  </article>
</template>

<script>
import BasePagination from "../base/BasePagination";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {playerService} from "../../services/player-service";
import BaseInput from "../base/form/BaseInput";
import BaseOutlinedButton from "../base/button/BaseOutlinedButton";
import BaseFormatted from "../base/BaseFormatted";
import {rankService} from "../../services/rank-service";

export default {
  name: "ThePlayerList",
  components: {BaseFormatted, BaseOutlinedButton, BaseInput, BasePagination},
  setup() {
    return {
      ...helpers(),
      size,
      ranks: rankService.ranks
    }
  }
}

function helpers() {
  const nick = ref('');
  const page = ref(0);
  const total = ref(0);

  const route = useRoute();
  const router = useRouter();

  const players = ref([]);

  onMounted(() => onRouteChange(route.query.nick, route.query.page));
  onBeforeRouteUpdate((to, from) => {
    if (to.query.nick !== from.query.nick || to.query.page !== from.query.page) {
      onRouteChange(to.query.nick, to.query.page);
    }
  });

  function validateNick() {
    if (playerService.isNickPartValid(nick.value)) {
      return '';
    } else {
      return 'Nieprawidłowy nick!';
    }
  }

  function onPageChange() {
    router.push({query: {nick: route.query.nick, page: page.value}});
  }

  function search(e) {
    e.preventDefault();

    document.activeElement.blur();
    if (validateNick()) {
      return;
    }

    router.push({query: {nick: nick.value, page: 0}});
  }

  function onRouteChange(newNick, newPage) {
    if (newPage === undefined) {
      router.push({query: {nick: newNick, page: 0}})
      return;
    }

    if (newNick === undefined) {
      nick.value = '';
    } else {
      nick.value = newNick;
    }

    page.value = Number.parseInt(newPage);

    playerService.getPlayers(newNick, newPage, size)
        .then(res => {
          players.value = res.data.data;
          total.value = res.data.total;
        })
        .catch(console.log);
  }

  return {
    nick,
    page,
    players,
    validateNick,
    search,
    total,
    onPageChange
  }
}
const size = 20;
</script>

<style scoped>
  .section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .player-list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    margin: 4rem 0;
    font-size: 1.4rem ;
  }

  .player-link {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
  }

  .player-link:hover .player-nick {
    transform: scale(1.2);
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

@media(min-width: 1200px) {
  .container {
    flex-direction: row;
    align-items: end;
  }
}
</style>