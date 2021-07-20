<template>
  <header class="header">
    <div class="gt-header-content">

    </div>
    <TheMainNavbar></TheMainNavbar>
  </header>
</template>

<script>
import TheMainNavbar from "@/components/header/TheMainNavbar";

export default {
  name: "TheGreatHeader",
  components: {TheMainNavbar}
}
</script>

<style scoped>
  .gt-header-content {
    height: 30vh;
    background-size: cover;
    background-image: url("../../assets/gt-header.jpg");
  }

  .header {
    position: sticky;
    top: -30vh;
  }
</style>