<template>
  <article class="section">
    <h2 class="section-title">Lista banów</h2>
    <form @submit="search" class="form">
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
          v-model="ban.recipient"
          :validator="validateRecipient"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Rozpoczął się od"
          v-model="ban.startFrom"
          :validator="validateStartFrom"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Rozpoczął się do"
          v-model="ban.startTo"
          :validator="validateStartTo"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Zakończy się od"
          v-model="ban.expirationFrom"
          :validator="validateExpirationFrom"
          min="2020-01-01"
      ></BaseInput>
      <BaseInput
          type="date"
          label="Zakończy się do"
          v-model="ban.expirationTo"
          :validator="validateExpirationTo"
      ></BaseInput>
      <BaseOutlinedButton type="submit">Szukaj</BaseOutlinedButton>
    </form>

    <ol class="non-styled-list ban-list">
      <li v-for="b in bans" :key="b.id" class="ban-item">
        <dl class="non-styled-dictionary ban-container" :class="`${b.oldType}`">
          <dt>Serwer</dt>
            <dd>{{ servers.get(b.server) }}</dd>
          <dt>Zbanowany</dt>
            <dd>
              <BaseFormatted
                  v-if="ranks.has(b.recipient.rank)"
                  :display="ranks.get(b.recipient.rank).displayName"
              ></BaseFormatted>
              {{ b.recipient.nick }}
            </dd>
          <dt>Start</dt>
            <dd>{{ dateService.toString(new Date(b.start * 1000)) }}</dd>
          <dt>Koniec</dt>
            <dd>{{ dateService.toString(new Date(b.expiration * 1000)) }}</dd>
          <dt>Status</dt>
            <dd class="old-type" :class="{'e': b.oldType === 'E', 'u': b.oldType === 'U', 'm': b.oldType === 'M'}">
              {{ oldTypes.get(b.oldType) }}
            </dd>
        </dl>
        <BaseOutlinedButton :to="`/bany/lista/${b.id}`" class="ban-link">Szczegóły</BaseOutlinedButton>
      </li>
    </ol>
    <BasePagination
        v-model="page"
        :total="total"
        :size="size"
        @changePage="onPageChange"
    ></BasePagination>
  </article>
</template>

<script>
import BaseSelect from "../base/form/BaseSelect";
import {serverService} from "../../services/server-service";
import {onMounted, reactive, ref} from "vue";
import {BanRequest} from "../../models/ban-request";
import BaseInput from "../base/form/BaseInput";
import {playerService} from "../../services/player-service";
import {onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
import {banService} from "../../services/ban-service";
import BasePagination from "../base/BasePagination";
import BaseOutlinedButton from "../base/button/BaseOutlinedButton";
import BaseFormatted from "../base/BaseFormatted";
import {rankService} from "../../services/rank-service";
import {dateService} from "../../services/date-service";
import {oldTypes} from "../../models/old-types";

export default {
  name: "TheBanList",
  components: {BaseFormatted, BaseOutlinedButton, BaseSelect, BaseInput, BasePagination},

  setup() {
    const currentServerForm = ref('0');
    const ban = reactive(new BanRequest())

    const page = ref(0);
    const total = ref(0);

    const route = useRoute();
    const router = useRouter();

    const bans = ref([]);

    const serversForm = new Map(serverService.servers.entries());
    serversForm.set(0, 'Wszystkie');

    onMounted(() => onRouteChange({
          server: route.query.serwer,
          recipient: route.query.nick,
          startFrom: route.query.poczatek_od,
          startTo: route.query.poczatek_do,
          expirationFrom: route.query.koniec_od,
          expirationTo: route.query.koniec_do
      },
      route.query.strona
    ));
    onBeforeRouteUpdate((to, from) => {
      if (
          to.query.serwer !== from.query.serwer ||
          to.query.nick !== from.query.nick ||
          to.query.poczatek_od !== from.query.poczatek_od ||
          to.query.poczatek_do !== from.query.poczatek_do ||
          to.query.koniec_od !== from.query.koniec_od ||
          to.query.koniec_do !== from.query.koniec_do ||
          to.query.strona !== from.query.strona
      ) {
        onRouteChange({
              server: to.query.serwer,
              recipient: to.query.nick,
              startFrom: to.query.poczatek_od,
              startTo: to.query.poczatek_do,
              expirationFrom: to.query.koniec_od,
              expirationTo: to.query.koniec_do
            },
            to.query.strona
        );
      }
    });

    function onRouteChange(banQuery, newPage) {
      if (banQuery.server === undefined) {
        ban.server = 0;
      } else {
        ban.server = Number.parseInt(banQuery.server);
      }

      if (banQuery.recipient === undefined) {
        ban.recipient = '';
      } else {
        ban.recipient = banQuery.recipient;
      }
      console.log(banQuery)

      if (banQuery.startFrom === undefined) {
        ban.startFrom = '';
      } else {
        ban.startFrom = new Date(banQuery.startFrom).getTime() / 1000;
      }

      if (banQuery.startTo === undefined) {
        ban.startTo = '';
      } else {
        ban.startTo = new Date(banQuery.startTo).getTime() / 1000;
      }

      if (banQuery.expirationFrom === undefined) {
        ban.expirationFrom = '';
      } else {
        ban.expirationFrom = new Date(banQuery.expirationFrom).getTime() / 1000;
      }

      if (banQuery.expirationTo === undefined) {
        ban.expirationTo = '';
      } else {
        ban.expirationTo = new Date(banQuery.expirationTo).getTime() / 1000;
      }

      if (newPage === undefined) {
        page.value = 0;
      } else {
        page.value = Number.parseInt(newPage);
      }

      banService.getBans(ban, page.value, size)
          .then(res => {
            bans.value = res.data.data;
            total.value = res.data.total;
          })
          .catch(console.log);
    }

    function validateRecipient() {
      if (!ban.recipient || playerService.isNickValid(ban.recipient)) {
        return '';
      } else {
        return 'Niepoprawny nick!';
      }
    }

    function validateStartFrom() {
      if (
          !ban.startFrom ||
          (
              (!ban.startTo || ban.startFrom <= ban.startTo) &&
              (!ban.expirationFrom || ban.startFrom <= ban.expirationFrom) &&
              (!ban.expirationTo || ban.startFrom <= ban.expirationTo)
          )
      ) {
        return '';
      } else {
        return 'Daty muszą zachowywać odpowiednią kolejność czasową!';
      }
    }

    function validateStartTo() {
      if (
          !ban.startTo ||
          (
              (!ban.startFrom || ban.startFrom <= ban.startTo) &&
              (!ban.expirationFrom || ban.startTo <= ban.expirationFrom) &&
              (!ban.expirationTo || ban.startTo <= ban.expirationTo)
          )
      ) {
        return '';
      } else {
        return 'Musi być większa niż koniec przedziału';
      }
    }

    function validateExpirationFrom() {
      if (
          !ban.expirationFrom ||
          (
              (!ban.startFrom || ban.startFrom <= ban.expirationFrom) &&
              (!ban.startTo || ban.startTo <= ban.expirationFrom) &&
              (!ban.expirationTo || ban.expirationFrom <= ban.expirationTo)
          )
      ) {
        return '';
      } else {
        return 'Musi być mniejsza niż koniec przedziału';
      }
    }

    function validateExpirationTo() {
      if (
          !ban.expirationTo ||
          (
              (!ban.startFrom || ban.startFrom <= ban.expirationTo) &&
              (!ban.startTo || ban.startTo <= ban.expirationTo) &&
              (!ban.expirationFrom || ban.expirationFrom <= ban.expirationTo)
          )
      ) {
        return '';
      } else {
        return 'Musi być większa niż koniec przedziału';
      }
    }

    function search(e) {
      e.preventDefault();

      document.activeElement.blur();
      if (validateRecipient() || validateStartFrom() || validateStartTo() || validateExpirationFrom() ||
          validateExpirationTo()) {
        return;
      }

      router.push({query: {
          strona: 0,
          serwer: ban.server,
          nick: ban.recipient,
          poczatek_od: ban.startFrom,
          poczatek_do: ban.startTo,
          koniec_od: ban.expirationFrom,
          koniec_do: ban.expirationTo
      }});
    }

    function onPageChange() {
      router.push({query: {
          strona: page.value,
          serwer: route.query.serwer,
          nick: route.query.nick,
          poczatek_od: route.query.poczatek_od,
          poczatek_do: route.query.poczatek_do,
          koniec_od: route.query.koniec_od,
          koniec_do: route.query.koniec_do
      }});
    }

    return {
      serversForm,
      servers: serverService.servers,
      currentServerForm,
      ban,
      validateStartFrom,
      validateStartTo,
      validateExpirationFrom,
      validateExpirationTo,
      validateRecipient,
      size,
      page,
      total,
      search,
      onPageChange,
      bans,
      ranks: rankService.ranks,
      dateService,
      oldTypes
    }
  }
}

const size = 30;
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: end;
  }

  .ban-list {
    display: grid;
    margin: 6rem 0;
    gap: 4rem;
    grid-template-columns: auto;
    justify-content: center;
  }

  .ban-item {
    display: block;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: #222020;
    box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.75);
  }

  .ban-container dt::after {
    content: ':';
  }

  .ban-container dd::before {
    content: '        ';
    white-space: break-spaces;
  }

  .ban-container dd {
    margin-bottom: 1rem;
  }

  .ban-container dd:last-child {
    margin-bottom: 2rem;
  }

  .ban-link {
    margin: 0 auto;
  }

@media(min-width: 1200px) {
  .ban-list {
    grid-template-columns: auto auto;
  }
}

@media(min-width: 1920px) {
  .ban-list {
    grid-template-columns: auto auto auto;
  }
}
</style>