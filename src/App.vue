<template>
  <TheGreatHeader v-if="route.name === 'home'"></TheGreatHeader>
  <TheHeader v-else></TheHeader>
  <main>
    <router-view></router-view>
  </main>
  <TheFooter></TheFooter>
</template>

<script>
import TheHeader from "@/components/header/TheHeader";
import TheFooter from "@/components/footer/TheFooter";
import {useRouter} from "vue-router";
import TheGreatHeader from "./components/header/TheGreatHeader";

export default {
  name: "TheSmallHeader",
  components: {TheGreatHeader, TheHeader, TheFooter},

  setup() {
    const router = useRouter();

    return {
      route: router.currentRoute
    }
  }
}
</script>