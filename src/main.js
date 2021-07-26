import "@/global.css"
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import TheHome from "./components/home/TheHome";
import {authService} from "./services/auth-service";

const routes = [
  { path: '/', name: 'home', component: TheHome },
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
