import "@/global.css"
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import TheHome from "./components/home/TheHome";
import {authService} from "./services/auth-service";
import TheSignIn from "./components/auth/TheSignIn";
import TheRankList from "./components/rank/TheRankList";
import TheRankEdit from "./components/rank/TheRankEdit";
import TheRankCreation from "./components/rank/TheRankCreation";
import ThePlayerList from "./components/player/ThePlayerList";
import ThePlayerProfile from "./components/player/ThePlayerProfile";
import TheBanList from "./components/ban/TheBanList";
import TheBanCreation from "./components/ban/TheBanCreation";
import TheBan from "./components/ban/TheBan";

const routes = [
  { path: '/', name: 'home', component: TheHome },
  { path: '/logowanie', name: 'signIn', component: TheSignIn},
  { path: '/rangi/lista', name: 'ranks', component: TheRankList },
  { path: '/rangi/lista/:id', name: 'rank-edit', component: TheRankEdit },
  { path: '/rangi/nowa', name: 'rank-create', component: TheRankCreation },
  { path: '/gracze', name: 'players', component: ThePlayerList},
  { path: '/gracze/:nick', name: 'profile', component: ThePlayerProfile},
  { path: '/bany/lista', name: 'bans', component: TheBanList },
  { path: '/bany/nowy', name: 'new-ban', component: TheBanCreation },
  { path: '/bany/lista/:id', name: 'ban', component: TheBan }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach(() => {
  document.activeElement.blur();
});

authService.getCurrent()
  .catch(err => err) // just to silence warning in console
  .finally(() => createApp(App)
      .use(router)
      .mount('#app')
  );
