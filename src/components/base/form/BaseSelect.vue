<template>
  <div class="container">
    <label class="input-container">
      <span class="label">{{ label }}</span>
      <select
          v-bind="$attrs"
          ref="input"
          class="input no-focus-lost"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
      >
        <option v-for="o in options" :key="o[0]" :value="o[0]">{{ o[1] }}</option>
      </select>
    </label>
    <span v-if="!input.checkValidity()" class="error-text">{{ error }}</span>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";

  export default {
    name: 'BaseSelect',
    props: {
      modelValue: {},
      label: String,
      error: String,
      options: Map,
      validator: {
        type: Function,
        default: () => true
      }
    },

    setup(props) {
      return validationHelpers(props)
    }
  }

function validationHelpers(props) {
  const input = ref({checkValidity: () => true});

  function validate(current) {
    if (current) {
      if (props.validator()) {
        input.value.setCustomValidity('');
      } else {
        input.value.setCustomValidity(props.error);
      }
    } else {
      input.value.setCustomValidity('');
    }
  }

  onMounted(validate);
  watch(
      () => props.modelValue,
      validate
  );

  return {
    input
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-flow: column;
    align-items: center;
  }

  .input-container {
    display: block;
  }

  .label {
    display: block;
    margin-left: 0.4rem;
    font-size: 0.9rem;
    color: #a7a6a6;
  }

  .input {
    min-width: 15rem;
    font-size: inherit;
    color: inherit;
    background-color: inherit;
    border-radius: 0.4rem;
    padding: 0.72rem;
    border: 0.1rem solid #a7a6a6;
    margin: 0.2rem 0 0 0;
    outline: none;
  }

  .input:disabled {
    border-color: #4b4b4b;
    color: #4b4b4b;
  }

  .input:focus {
    border-color: #c04659;
  }

  .input:invalid {
    outline: none;
    box-shadow: none;
    border-color: #dd0000;
  }

  .error-text {
    font-size: 0.9rem;
    margin-top: 0.7rem;
    margin-left: 0.4rem;
    color: #dd0000;
    align-self: start;
  }
</style>