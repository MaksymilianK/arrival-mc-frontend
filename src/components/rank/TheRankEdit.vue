<template>
  <article>
    <h2 class="section-title">Edycja rangi</h2>
    <TheRankForm :rank="rank" @submit="modifyRank"></TheRankForm>
    <div v-if="rank.id !== rankDefaultId && rank.id !== rankOwnerId" class="container">
      lub
      <BaseOutlinedButton @click="removeRank">Usuń rangę</BaseOutlinedButton>
    </div>
  </article>
</template>

<script>
import TheRankForm from "./TheRankForm";
import {rankService} from "../../services/rank-service";
import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {RankModification} from "../../models/rank-modification";
import BaseOutlinedButton from "../base/button/BaseOutlinedButton";
import {rankDefaultId, rankOwnerId} from "../../models/rank-consts";

export default {
  name: "TheRankEdit",
  components: {BaseOutlinedButton, TheRankForm},

  setup() {
    return {
      ...helpers(),
      rankDefaultId,
      rankOwnerId
    }
  }
}

function helpers() {
  const rank = ref({});

  const route = useRoute();
  const router = useRouter();

  onMounted(() => loadRank(route.params.id));
  onBeforeRouteUpdate((to, from) => {
    if (to.params.id !== from.params.id) {
      loadRank(to.params.id);
    }
  });

  function loadRank(id) {
    rankService.getRank(id)
        .then(res => rank.value = res.data)
        .catch(err => console.log(err));
  }

  function modifyRank(rankForm) {
    rankService.modifyRank(route.params.id, new RankModification(rank.value, rankForm))
        .then(() => router.push({name: 'ranks'}))
        .catch(err => console.log(err));
  }

  function removeRank() {
    rankService.removeRank(route.params.id)
        .then(() => router.push({name: 'ranks'}))
        .catch(err => console.log(err));
  }

  return {rank, modifyRank, removeRank};
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
</style>