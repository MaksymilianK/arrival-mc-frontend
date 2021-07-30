<template>
  <article class="section">
    <h2 class="section-title">Lista banów</h2>
    <form class="form">
      <BaseSelect
          :options="servers"
          label="Serwer"
          v-model="currentServerForm"
      >
      </BaseSelect>
      <BaseInput
          type="text"
          label="Nick gracza"
          placeholder="np. MiXdu"
          v-model="ban.nick"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Rozpoczął się od"
          v-model="ban.startFrom"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Rozpoczął się do"
          v-model="ban.startTo"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Zakończy się od"
          v-model="ban.expirationFrom"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Zakończy się do"
          v-model="ban.expirationTo"
      ></BaseInput>
    </form>
  </article>
</template>

<script>
import BaseSelect from "../base/form/BaseSelect";
import {serverService} from "../../services/server-service";
import {reactive, ref} from "vue";
import {BanRequest} from "../../models/ban-request";
import BaseInput from "../base/form/BaseInput";
import {serverNetworkId} from "../../models/server-consts";

export default {
  name: "TheBanList",
  components: {BaseSelect, BaseInput},
  setup() {
    const currentServerForm = ref(serverNetworkId.toString());
    const ban = reactive(new BanRequest())

    return {
      servers: serverService.servers,
      currentServerForm,
      ban
    }
  }
}
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>