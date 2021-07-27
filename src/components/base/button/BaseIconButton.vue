<template>
  <router-link v-if="link" :to="link">
    <img :src="src" :alt="alt">
  </router-link>
  <button v-else class="btn">
    <img :src="src" :alt="alt">
  </button>
</template>

<script>
import {computed, ref} from 'vue';

export default {
  props: {
    link: {
      type: String,
      default: ''
    },
    imgSrc: String,
    alt: String
  },

  setup(props) {
    const imgSrc = ref(props.imgSrc);
    const src = computed(() => require('@/assets/' + imgSrc.value));

    return {
      src
    }
  }
}

</script>

<style scoped>
  .btn {
    border: none;
    background-color: inherit;
    outline: none;
    padding: 5px;
    cursor: pointer;
  }
</style>