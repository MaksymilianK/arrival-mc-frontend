<template>
  <form class="form" @submit="$event.preventDefault">
    <BaseInput
        type="number"
        :disabled="rankForm.id === rankDefaultId || rankForm.id === rankOwnerId"
        label="Poziom"
        placeholder="1-32767"
        v-model="rankForm.level"
        :validator="validateLevel"
    ></BaseInput>
    <BaseInput
        type="text"
        label="Nazwa"
        placeholder="np. Gracz"
        v-model="rankForm.name"
        :validator="validateName"
    ></BaseInput>
    <div class="coupled-container">
      <BaseInput
          type="text"
          label="Formatowanie nazwy"
          placeholder="np. &3&lGracz"
          v-model="rankForm.displayName"
          :validator="validateDisplayName"
      ></BaseInput>
      <BaseFormatted :display="rankForm.displayName" class="live"></BaseFormatted>
    </div>
    <div class="coupled-container">
      <BaseInput
          type="text"
          label="Formatowanie chatu"
          placeholder="np. {{NICK}} : {{MSG}}"
          v-model="rankForm.chatFormat"
          :validator="validateChatFormat"
      ></BaseInput>
      <BaseFormatted :display="chatFormatLive" class="live"></BaseFormatted>
    </div>

    <h3 class="section-subtitle">Permisje</h3>
    <BaseSelect
        :options="servers"
        label="Serwer"
        v-model="currentServerForm"
    >
    </BaseSelect>
    <ul class="non-styled-list perm-list">
      <li v-for="p in rankForm.perms.get(currentServer)" :key="p" class="perm-item">
        {{ p }}
        <button type="button" @click="removePerm(p)" class="rem-perm-btn">
          <img src="@/assets/remove.svg" alt="usuń" class="rem-perm-icon">
        </button>
      </li>
    </ul>
    <div class="coupled-container">
      <BaseInput
          type="text"
          label="Nowa permisja"
          placeholder="np. rank.view"
          v-model="perm"
          :validator="validatePerm"
      ></BaseInput>
      <BaseOutlinedButton type="button" @click="addPerm">Dodaj</BaseOutlinedButton>
    </div>
    <BaseButton type="submit" @click="submit($event, $emit)" class="submit-btn">Wyślij</BaseButton>
  </form>
</template>

<script>
import {computed, reactive, ref, watch} from "vue";
import {serverService} from "../../services/server-service";
import {RankFull} from "../../models/rank-full";
import {serverWebsiteId} from "../../models/server-consts";
import {rankDefaultId, rankDefaultLevel, rankOwnerId, rankOwnerLevel} from "../../models/rank-consts";
import BaseOutlinedButton from "../base/button/BaseOutlinedButton";
import BaseFormatted from "../base/BaseFormatted";
import BaseInput from "../base/form/BaseInput";
import BaseSelect from "../base/form/BaseSelect";
import BaseButton from "../base/button/BaseButton";

export default {
  name: "TheRankForm",
  components: {BaseButton, BaseOutlinedButton, BaseFormatted, BaseInput, BaseSelect},
  props: {
    rank: Object
  },
  emits: ['submit'],

  setup(props) {
    return {
      ...formHelpers(props),
      servers: serverService.servers,
      rankDefaultId,
      rankOwnerId
    }
  }
}

const permRegex = /^!?[A-Za-z0-9]+(\.[A-Za-z0-9]+)*$/;

const levelError = `Poziom musi być unikalny i musi znajdować się w przedziale od 1 do 32768 (1000 jest zarezerwowany
      dla domyślnej rangi, a 32767 dla najwyższej rangi)!`
const nameError = 'Nazwa musi być długości od 1 do 30 znaków!';
const displayNameError = 'Formatowanie nazwy musi być długości od 1 do 75 znaków!';
const chatFormatError = 'Formatowanie chatu musi być długości od 1 do 200 znaków!';
const permExistsError = 'Permisja już występuje w tym zbiorze!';
const permFormatError = 'Niewłaściwa postać permisji!';

function formHelpers(props) {
  const rankForm = reactive(new RankFull(...Object.values(props.rank)));
  watch(
      () => props.rank,
      () => rankForm.update(props.rank)
  );

  const chatFormatLive = computed(chatFormatReplaced);

  const currentServerForm = ref(serverWebsiteId.toString());
  const currentServer = computed(() => Number.parseInt(currentServerForm.value));
  const perm = ref('');

  function validateLevel() {
    const level = Number.parseInt(rankForm.level);
    const id = rankForm.id;

    if (level > 0 && level < 32768 &&
        (
            (level === rankDefaultLevel && id === rankDefaultId) ||
            (level === rankOwnerLevel && id === rankOwnerId) ||
            (level !== rankDefaultLevel && level !== rankOwnerLevel &&
                id !== rankDefaultId && id !== rankOwnerId)
        )
    ) {
      return '';
    } else {
      return levelError;
    }
  }

  function validateName() {
    if (rankForm.name.length > 0 && rankForm.name.length <= 30) {
      return '';
    } else {
      return nameError;
    }
  }

  function validateDisplayName() {
    if (rankForm.displayName.length > 0 && rankForm.displayName.length <= 75) {
      return '';
    } else {
      return displayNameError;
    }
  }

  function validateChatFormat() {
    if (rankForm.chatFormat.length > 0 && rankForm.chatFormat.length <= 200) {
      return '';
    } else {
      return chatFormatError;
    }
  }

  function chatFormatReplaced() {
    let replaced = rankForm.chatFormat.replaceAll('{{RANK}}', rankForm.name);
    replaced = replaced.replaceAll('{{FRANK}}', rankForm.displayName);
    replaced = replaced.replaceAll('{{NICK}}', 'Nick');
    replaced = replaced.replaceAll('{{MSG}}', 'Treść wiadomości');
    return replaced;
  }

  function validatePerm() {
    const permsOnServer = rankForm.perms.get(currentServer.value);
    if (permsOnServer && permsOnServer.has(perm.value)) {
      return permExistsError;
    } else if (!permRegex.test(perm.value)) {
      return permFormatError;
    } else {
      return '';
    }
  }

  function removePerm(perm) {
    const permsOnServer = rankForm.perms.get(currentServer.value);
    permsOnServer.delete(perm);
    if (permsOnServer.size === 0) {
      rankForm.perms.delete(currentServer.value);
    }
  }

  function addPerm() {
    document.activeElement.blur();
    if (validatePerm()) {
      return;
    }

    if (!rankForm.perms.has(currentServer.value)) {
      rankForm.perms.set(currentServer.value, new Set());
    }
    rankForm.perms.get(currentServer.value).add(perm.value);
  }

  function submit(e, emit) {
    e.preventDefault();
    if (validateLevel() || validateName() || validateDisplayName() || validateChatFormat()) {
      return;
    }

    emit('submit', rankForm);
  }

  return {
    rankForm,
    chatFormatLive,
    currentServerForm,
    currentServer,
    perm,
    validateLevel,
    validateName,
    validateDisplayName,
    validateChatFormat,
    validatePerm,
    removePerm,
    addPerm,
    submit
  }
}
</script>

<style scoped>
  .coupled-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .live {
    font-size: 1.5rem;
  }

  .perm-list {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .perm-item {
    display: flex;
  }

  .rem-perm-btn {
    margin-left: 0.8rem;
  }

  .rem-perm-btn:hover, .rem-perm-btn:focus, .rem-perm-btn:active {
    transform: scale(1.2);
  }

  .submit-btn {
    margin-top: 5rem;
  }

  @media(min-width: 1200px) {
    .coupled-container {
      flex-direction: row;
      align-items: end;
    }
  }
</style>