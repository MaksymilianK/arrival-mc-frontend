<template>
  <span class="mc-f-7" v-html="formatRank(display)"></span>
</template>

<script>
export default {
  name: "BaseFormatted",
  props: {
    display: String
  },

  setup() {
    return {
      formatRank
    }
  }
}

const colourCodes = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']);
const styleCodes = new Set(['k', 'l', 'm', 'n', 'o']);
const formatSymbol = '&';
const resetCode = 'r';

function formatRank(rank) {
  if (!rank) {
    return ''
  } else {
    return build(rank, false, false);
  }
}

function findFirstCode(text) {
  let symbolIndex = -1;
  let code;

  do {
    symbolIndex = text.indexOf(formatSymbol, symbolIndex + 1);
    code = text.charAt(symbolIndex + 1);
  } while (symbolIndex >= 0 && !colourCodes.has(code) && !styleCodes.has(code) && code !== resetCode);

  return symbolIndex;
}

function build(text, coloured, styled) {
  let firstCode = findFirstCode(text);
  let formatted = '';
  if (firstCode < 0) {
    formatted += text;
    if (coloured) {
      formatted += '</span>';
    }
    if (styled) {
      formatted += '</span>';
    }
    return formatted;
  }

  formatted += text.substring(0, firstCode);
  let code = text.charAt(firstCode + 1);
  if (colourCodes.has(code)) {
    if (coloured) {
      formatted += '</span>';
    }
    if (styled) {
      formatted += '</span>';
    }
    formatted += `<span class="mc-f-${code}">`;

    return formatted + build(text.substring(firstCode + 2), true, false);
  } else if (styleCodes.has(code)) {
    if (styled) {
      formatted += '</span>';
    }
    formatted += `<span class="mc-f-${code}">`;

    return formatted + build(text.substring(firstCode + 2), coloured, true);
  } else {
    if (coloured) {
      formatted += '</span>';
    }
    if (styled) {
      formatted += '</span>';
    }

    return formatted + build(text.substring(firstCode + 2), false, false);
  }
}

</script>

<style scoped>

</style>