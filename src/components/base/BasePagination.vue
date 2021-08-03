<template>
  <nav class="container">
    <ol class="non-styled-list pagination">
      <li v-if="firstShown" class="first-el">
        <BaseButton @click="go($emit, 0)">1</BaseButton>
      </li>
      <li v-if="prevShown">
        <BaseButton @click="go($emit, modelValue - 1)">{{ modelValue }}</BaseButton>
      </li>
      <li class="current-el">
        <BaseButton disabled>{{ modelValue + 1 }}</BaseButton>
      </li>
      <li v-if="nextShown">
        <BaseButton @click="go($emit, modelValue + 1)">{{ modelValue + 2 }}</BaseButton>
      </li>
      <li v-if="lastShown" class="last-el">
        <BaseButton @click="go($emit, pages - 1)">{{ pages }}</BaseButton>
      </li>
    </ol>
  </nav>
</template>

<script>
  import BaseButton from "@/components/base/button/BaseButton";
  import {computed} from "vue";

  export default {
    components: {BaseButton},
    props: {
      modelValue: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 30
      },
      total: {
        type: Number,
        default: 0
      }
    },
    emits: ['changePage', 'update:modelValue'],

    setup(props) {
      const pages = computed(() => Math.ceil(props.total / props.size));
      const firstShown = computed(() => props.modelValue > 1);
      const prevShown = computed(() => props.modelValue > 0);
      const nextShown = computed(() => props.modelValue < pages.value - 1);
      const lastShown = computed(() => props.modelValue < pages.value - 2);

      return {
        pages,
        firstShown,
        prevShown,
        lastShown,
        nextShown,
        go
      }
    }
  }

  function go(emit, page) {
    emit('update:modelValue', page);
    emit('changePage');
  }
</script>

<style scoped>
  .pagination {
    display: flex;
  }

  .current-el {
    margin: 0 0.5em;
  }

  .first-el {
    margin-right: 2em;
    position: relative;
  }

  .first-el::after {
    position: absolute;
    right: -1.5em;
    bottom: 0;
    display: inline;
    content: '...';
  }

  .last-el {
    margin-left: 2em;
    position: relative;
  }

  .last-el::before {
    position: absolute;
    left: -1.5em;
    bottom: 0;
    display: inline;
    content: '...';
  }

  .container {
    margin: 0 auto;
    width: min-content;
  }
</style>