<template>
  <article>
    <h2 class="section-title">Lista rang</h2>
    <ol class="non-styled-list rank-list">
      <li v-for="r in ranks" :key="r[1].id">
        <router-link :to="`/rangi/lista/${r[1].id}`" class="rank-link">
          <BaseFormatted :display="r[1].displayName"></BaseFormatted>
          <img src="@/assets/pencil.svg" alt="edytuj rangę" class="edit-icon">
        </router-link>
      </li>
    </ol>
    <BaseButton to="/rangi/nowa" class="new-btn">Stwórz nową</BaseButton>
  </article>
</template>

<script>
import {rankService} from "../../services/rank-service";
import BaseFormatted from "../base/BaseFormatted";
import BaseButton from "../base/button/BaseButton";

export default {
  name: "TheRankList",
  components: {BaseButton, BaseFormatted},

  setup() {
    return {
      ranks: rankService.ranks
    }
  }
}
</script>

<style scoped>
  .rank-list {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.5rem;
  }

  .rank-list li {
    display: block;
  }

  .rank-link:hover, .rank-link:focus, .rank-link:active {
    display: block;
    transform: scale(1.2);
  }

  .edit-icon {
    margin-left: 0.7rem;
  }

  .new-btn {
    margin: 5rem auto 0 auto;
  }
</style>