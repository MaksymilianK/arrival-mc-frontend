import "@/global.css"
import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import TheHome from "./components/home/TheHome";

const routes = [
  { path: '/', name: 'home', component: TheHome },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

createApp(App)
  .use(router)
  .mount('#app')
