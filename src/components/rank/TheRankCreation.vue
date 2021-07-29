<template>
  <article>
    <h2 class="section-title">Tworzenie rangi</h2>
    <TheRankForm :rank="rank" @submit="createRank"></TheRankForm>
  </article>
</template>

<script>
import TheRankForm from "./TheRankForm";
import {ref} from "vue";
import {RankCreation} from "../../models/rank-creation";
import {rankService} from "../../services/rank-service";
import {useRouter} from "vue-router";

export default {
  name: "TheRankCreation",
  components: {TheRankForm},

  setup() {
    const rank = ref({});
    const router = useRouter();

    function createRank(rankForm) {
      rankService.createRank(new RankCreation(rankForm))
          .then(() => router.push({name: 'ranks'}))
          .catch(err => console.log(err));
    }

    return {
      rank,
      createRank
    };
  }
}
</script>

<style scoped>

</style>