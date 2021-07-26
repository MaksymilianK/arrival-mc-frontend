<template>
  <TheGreatHeader v-if="route.name === 'home'"></TheGreatHeader>
  <TheHeader v-else></TheHeader>
  <main>
    <router-view></router-view>
    <aside v-if="sessionWarning" class="session-warning">
      Wkrótce zostaniesz wylogowany z powodu braku aktywności. Czy chcesz przedłużyć swoją sesję?
      <button @click="authService.turnOffSessionWarning">Nie</button>
      <button @click="authService.extendSession">Tak</button>
    </aside>
  </main>
  <TheFooter></TheFooter>
</template>

<script>
import TheHeader from "@/components/header/TheHeader";
import TheFooter from "@/components/footer/TheFooter";
import {useRouter} from "vue-router";
import TheGreatHeader from "./components/header/TheGreatHeader";
import {authService} from "./services/auth-service";

export default {
  name: "TheSmallHeader",
  components: {TheGreatHeader, TheHeader, TheFooter},

  setup() {
    return {
      route: useRouter().currentRoute,
      sessionWarning: authService.sessionWarning,
      authService
    }
  }
}
</script>

<style scoped>
  .session-warning {
    position: sticky;
    bottom: 0;
  }
</style>
