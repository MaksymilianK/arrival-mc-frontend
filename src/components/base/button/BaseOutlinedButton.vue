<template>
  <router-link v-if="to" :to="to" class="outlined-button">
    <slot></slot>
  </router-link>
  <button v-else class="outlined-button">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: "BaseOutlinedButton",
    props: {
      to: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .outlined-button {
    white-space: nowrap;
    width: min-content;
    text-transform: uppercase;
    padding: 1rem 1.5rem;
    border: 0.1rem solid #c04659;
    border-radius: 0.5rem;
    transition-duration: 0.3s;
  }

  .outlined-button:focus, .outlined-button:hover {
    outline: none;
    background-color: #c04659;
    color: #e2e2e2;
    box-shadow: inset 0px 0px 5px 0px rgba(0,0,0,0.75);
  }
</style>