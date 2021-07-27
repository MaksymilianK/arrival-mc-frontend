<template>
  <router-link v-if="to" :to="to" class="button" :class="color">
    <slot></slot>
  </router-link>
  <button v-else @click="$emit('click')" class="button" :class="color">
    <slot></slot>
    <span v-if="isDropdown" class="material-icons icon">arrow_drop_down</span>
  </button>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        default: ''
      },
      isDropdown: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: 'primary'
      }
    },

    emits: {
      click: null
    },
  }
</script>

<style scoped>
  .button {
    padding: 0;
    display: inline-block;
    cursor: pointer;
    color: #a7a6a6;
    border: none;
    white-space: nowrap;
    text-transform: uppercase;
    margin: 0;
    width: fit-content;
    box-sizing: border-box;
    background: inherit;
  }

  .button::after {
    content: '';
    height: 0.2rem;
    margin-top: 1px;
    display: block;
    transform: scaleX(0);
    transition: 0.3s;
    background-color: #c04659;
  }

  .icon {
    line-height: 0;
    position: relative;
    top: 0.2em;
  }

  .button.primary .icon {
    color: #c04659;
  }

  .button.secondary .icon {
    color: #a7a6a6;
  }

  .button:hover::after, .button:focus::after {
    transform: scaleX(1);
  }

  .button:focus, .button:active {
    padding: 0;
    outline: none;
  }
</style>
