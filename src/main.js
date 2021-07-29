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

const routes = [
  { path: '/', name: 'home', component: TheHome },
  { path: '/logowanie', name: 'signIn', component: TheSignIn},
  { path: '/rangi/lista', name: 'ranks', component: TheRankList },
  { path: '/rangi/lista/:id', name: 'rank-edit', component: TheRankEdit },
  { path: '/rangi/nowa', name: 'rank-create', component: TheRankCreation }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

authService.getCurrent()
  .catch(err => err) // just to silence warning in console
  .finally(() => createApp(App)
      .use(router)
      .mount('#app')
  );
