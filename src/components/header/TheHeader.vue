<template>
  <header class="header">
    <TheMainNavbar></TheMainNavbar>
  </header>
</template>

<script>
import TheMainNavbar from "@/components/header/TheMainNavbar";

export default {
  name: "TheHeader",
  components: {TheMainNavbar}
}
</script>

<style scoped>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
  }
</style>