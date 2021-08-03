<template>
  <article class="section">
    <h2 class="section-title">{{ `Ban nr ${ban.id}` }}</h2>
    <div class="container">
      <div class="recipient-info">
        <div>
          <span class="data-term">Zbanowany</span>
          <br>
          <BaseFormatted
              v-if="ranks.has(ban.recipient.rank)"
              :display="ranks.get(ban.recipient.rank).displayName"
          ></BaseFormatted>
          {{ ban.recipient.nick }}
        </div>
        <img v-if="ban.recipient.nick" :src="`https://minotar.net/avatar/${ban.recipient.nick}`" alt="" class="recipient-img">
      </div>
      <div>
        <span class="data-term">Banujący</span>
        <BaseFormatted
            v-if="ranks.has(ban.giver.rank)"
            :display="ranks.get(ban.giver.rank).displayName"
        ></BaseFormatted>
        {{ ban.giver.nick }}
      </div>
      <div>
        <span class="data-term">Serwer</span>
        <span v-if="servers.has(ban.server)">{{ servers.get(ban.server) }}</span>
      </div>
      <div>
        <span class="data-term">Start</span>
        <span>{{ dateService.toString(new Date(ban.start * 1000)) }}</span>
        <br>
        <span class="data-term">Koniec</span>
        <span>{{ dateService.toString(new Date(ban.expiration * 1000)) }}</span>
      </div>
      <div>
        <span class="data-term">Powód</span>
        <br>
        <span>{{ ban.reason }}</span>
      </div>
      <div>
        <span class="data-term">Status</span>
        <span class="old-type" :class="{'e': ban.oldType === 'E', 'u': ban.oldType === 'U', 'm': ban.oldType === 'M'}">
          {{ oldTypes.get(ban.oldType) }}
        </span>

        <template v-if="ban.oldType">
          <span class="data-term">Rzeczywisty koniec</span>
          <span>{{ ban.actualExpiration }}</span>

          <br>

          <template v-if="ban.oldType !== 'E'">
            <span class="data-term">Zmodyfikował</span>
            <BaseFormatted
                v-if="ranks.has(ban.modder.rank)"
                :display="ranks.get(ban.modder.rank).displayName"
            ></BaseFormatted>
            {{ ban.modder.nick }}

            <br>
            <BaseButton>Przejdź do nowego</BaseButton>
            <br>

            <span class="data-term">Powód modyfikacji</span>
            <span>{{ ban.modificationReason }}</span>
          </template>
        </template>
      </div>
      <div>
        <BaseButton v-if="authService.hasPerm('ban.modify')">Usuń bana</BaseButton>
      </div>
    </div>
  </article>
</template>

<script>
import {onMounted, reactive} from "vue";
import {BanFull} from "../../models/ban-full";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import {banService} from "../../services/ban-service";
import BaseFormatted from "../base/BaseFormatted";
import {rankService} from "../../services/rank-service";
import {serverService} from "../../services/server-service";
import {dateService} from "../../services/date-service";
import {oldTypes} from "../../models/old-types";
import BaseButton from "../base/button/BaseButton";
import {authService} from "../../services/auth-service";

export default {
  name: "TheBan",
  components: {BaseButton, BaseFormatted},

  setup() {
    const route = useRoute();
    const ban = reactive(new BanFull(route.params.id));

    onMounted(() => banService.getBan(route.params.id)
        .then(res => ban.update(res.data))
        .catch(console.log)
    );
    onBeforeRouteUpdate((to, from) => {
      if (to.params.id !== from.params.id) {
        banService.getBan(to.params.id)
            .then(res => ban.update(res.data))
            .catch(console.log);
      }
    })

    setTimeout(() => console.log(ban), 1000)

    return {
      ban,
      ranks: rankService.ranks,
      servers: serverService.servers,
      dateService,
      oldTypes,
      authService
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  .recipient-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .recipient-img {
    width: 6rem;
  }

  .data-term::after {
    content: ': ';
  }

@media(min-width: 1200px) {
  .recipient-info {
    flex-direction: row;
  }
}
</style>