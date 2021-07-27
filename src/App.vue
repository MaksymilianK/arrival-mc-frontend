<template>
  <TheGreatHeader v-if="route.name === 'home'"></TheGreatHeader>
  <TheHeader v-else></TheHeader>
  <main>
    <router-view></router-view>
    <aside v-if="sessionWarning" class="session-warning">
      Wkrótce zostaniesz wylogowany z powodu braku aktywności. Czy chcesz przedłużyć swoją sesję?
      <br>
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
    padding: 1rem;
    background-color: #222020;
    box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.75);
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    text-align: center;
  }
</style>
