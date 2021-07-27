<template>
  <article>
    <h2 class="section-title">Lista rang</h2>
    <ol class="non-styled-list rank-list">
      <li v-for="r in ranks" :key="r.id">
        <BaseFormattedRank :display-name="r.displayName"></BaseFormattedRank>
      </li>
    </ol>
  </article>
</template>

<script>
import {rankService} from "../../services/rank-service";
import BaseFormattedRank from "../base/BaseFormattedRank";

export default {
  name: "TheRankList",
  components: {BaseFormattedRank},
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
    gap: 1rem;
    font-size: 1.2rem;
  }

  .rank-list li {
    display: block;
  }
</style>