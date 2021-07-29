<template>
  <div class="navbar">
    <router-link to="/" class="main-logo-container">
      <img src="@/assets/logo.png" alt="" class="main-logo">
      <h1 class="main-text-header">Arrival</h1>
    </router-link>

    <div class="media-container">
      <a href="#" class="media-link">
        <img src="@/assets/discord.svg" alt="discord" class="media-icon media-icon-non-cl">
        <img src="@/assets/discord-cl.svg" alt="discord" class="media-icon media-icon-cl">
      </a>
      <a href="#" class="media-link">
        <img src="@/assets/facebook.svg" alt="facebook" class="media-icon media-icon-non-cl">
        <img src="@/assets/facebook-cl.svg" alt="facebook" class="media-icon media-icon-cl">
      </a>
    </div>

    <input type="checkbox" id="menu-input"  class="menu-input">
    <label for="menu-input" class="menu-btn">
      <img src="@/assets/menu-open.svg" alt="open menu" class="menu-icon open-menu-icon">
      <img src="@/assets/menu-close.svg" alt="close menu" class="menu-icon close-menu-icon">
    </label>

    <nav class="nav-container">
      <ol class="non-styled-list nav">
        <li class="nav-item login-nav-item">
          <div v-if="current" class="user-container">
            <input type="checkbox" id="login-input" class="login-input">
            <label for="login-input" class="nav-btn login-nav-btn">
              {{ current.nick }}
              <img src="@/assets/dropdown.svg" alt="dropdown" class="login-icon dropdown-icon">
              <img src="@/assets/dropup.svg" alt="dropdown" class="login-icon dropup-icon">
            </label>
            <ul class="non-styled-list user-menu">
              <li class="nav-item"><router-link :to="`/gracze/${current.nick}`" class="nav-btn"><span class="nav-text">Profil</span></router-link></li>
              <li class="nav-item"><router-link to="/gracze" class="nav-btn"><span class="nav-text">Gracze</span></router-link></li>
              <li v-if="current.hasPerm('rank.view')" class="nav-item"><router-link to="/rangi/lista" class="nav-btn"><span class="nav-text">Rangi</span></router-link></li>
              <li class="nav-item"><button @click="signOut" class="nav-btn"><span class="nav-text">Wyloguj</span></button></li>
            </ul>
          </div>
          <router-link v-else to="/logowanie" class="nav-btn login-nav-btn">Zaloguj</router-link>
        </li>
        <li class="nav-item shop-nav-item"><router-link to="#" class="nav-btn"><span class="nav-text">Sklep</span></router-link></li>
        <li class="nav-item contact-nav-item"><router-link to="#" class="nav-btn"><span class="nav-text">Kontakt</span></router-link></li>
        <li class="nav-item rules-nav-item"><router-link to="#" class="nav-btn"><span class="nav-text">Regulamin</span></router-link></li>
        <li class="nav-item help-nav-item"><router-link to="#" class="nav-btn"><span class="nav-text">Pomoc</span></router-link></li>
      </ol>
    </nav>
  </div>
</template>

<script>

import {authService} from "../../services/auth-service";

export default {
  name: "TheMainNavbar",
  components: {},

  setup() {
    return {
      current: authService.current,
      signOut
    }
  }
}

function signOut() {
  authService.signOut();
}
</script>

<style scoped>
.navbar {
  height: 3.5rem;
  background-color: #222020;
  box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: space-between;
  position: relative;
}

.main-logo-container {
  display: flex;
  font-size: 0.8rem;
  align-items: center;
}

.main-logo {
  height: 2.7rem;
  display: block;
  margin-left: 0.4rem;
}

.main-text-header {
  font-size: 2rem;
  margin-left: 0.4rem;
}

.media-container {
  display: flex;
  align-items: center;
}

.media-link:not(:first-child) {
  margin-left: 0.5rem;
}

.media-icon {
  display: block;
  height: 2.5rem;
  border-radius: 50%;
}

.media-icon-cl {
  display: none;
}

.media-link:hover .media-icon-non-cl {
  display: none;
}

.media-link:hover .media-icon-cl {
  display: block;
}

.menu-btn {
  height: 2rem;
  cursor: pointer;
  margin: 0.75rem 0.75rem 0 0;
}

.menu-icon {
  height: 2rem;
}

.close-menu-icon {
  display: none;
}

.nav-container {
  width: 100%;
  background-color: #222020;
  position: absolute;
  display: none;
  top: 3.5rem;
  z-index: -1;
  box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.75);
}

.nav {
  margin-top: 0.7rem;
  width: 100%;
  display: flex;
  flex-flow: column;
}

.menu-input {
  position: absolute;
  left: -9999px;
}

.menu-input:focus ~ .menu-btn {
  outline: #a7a6a6 dotted 1px;
}

.menu-input:checked ~ .nav-container {
  display: block;
}

.menu-input:checked ~ .menu-btn .open-menu-icon {
  display: none;
}

.menu-input:checked ~ .menu-btn .close-menu-icon {
  display: block;
}

.nav-item {
  text-transform: uppercase;
  display: block;
  width: 100%;
  text-align: center;
  line-height: inherit;
}

.nav-btn:hover, .nav-btn:focus, .nav-btn:active {
  background-color: #a7a6a6;
  color: #222020;
}

.nav-btn {
  display: block;
  width: 100%;
  padding: 0.75rem 0;
}

.login-nav-btn {
  background-color: #c04659;
  color: #e2e2e2;
  box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.login-nav-btn:focus, .login-nav-btn:hover, .login-nav-btn:active {
  background-color: #7f2e38;
  color: #e2e2e2;
}

.login-input {
  position: absolute;
  opacity: 0.0;
  left: -9999px;
}

.login-input:focus ~ .login-nav-btn {
  background-color: #7f2e38;
}

.login-icon {
  display: block;
  margin-left: 0.4rem;
  height: 1rem;
}

.login-input:checked ~ .login-nav-btn .dropdown-icon {
  display: none;
}

.login-input:not(:checked) ~ .login-nav-btn .dropup-icon {
  display: none;
}

.user-menu {
  border-bottom: 1px dashed #4b4b4b;
}

.login-input:not(:checked) ~ .user-menu {
  display: none;
}

@media(min-width: 1200px) {
  .menu-input {
    display: none;
  }

  .menu-btn {
    display: none;
  }

  .main-logo-container {
    order: 0;
  }

  .media-container {
    order: 2;
    margin-right: 0.8em;
  }

  .nav-container {
    order: 1;
    top: 0;
    display: block;
    z-index: 1;
    width: auto;
    box-shadow: none;
    position: static;
  }

  .nav {
    position: absolute;
    width: auto;
    left: 50%;
    transform: translateX(-50%);
    flex-flow: row;
    margin-top: 0;
    height: 100%;
    justify-content: center;
  }

  .nav-item {
    width: auto;
  }

  .login-nav-item {
    position: relative;
    order: 3;
    top: -0.6rem;
  }

  .shop-nav-item {
    order: 1;
  }

  .contact-nav-item {
    order: 2;
  }

  .rules-nav-item {
    order: 3;
  }

  .help-nav-item {
    order: 4;
  }

  .nav-btn {
    width: auto;
    font-size: 1rem;
    line-height: 1rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .nav-text {
    margin: auto;
    display: block;
    width: min-content;
  }

  .nav-text::after {
    content: "";
    background-color: #c04659;
    height: 0.2rem;
    margin-top: 0.2rem;
    display: block;
    transform: scaleX(0.0);
    transition-duration: 0.3s;
  }

  .nav-btn:not(.login-nav-btn):hover, .nav-btn:not(.login-nav-btn):focus, .nav-btn:not(.login-nav-btn):active {
    background-color: inherit;
    color: inherit;
  }

  .nav-btn:hover .nav-text::after, .nav-btn:focus .nav-text::after, .nav-btn:active .nav-text::after {
    transform: scaleX(1.0);
  }

  .login-icon {
    height: 1.2rem;
  }

  .nav > .nav-item .nav-btn:not(.login-nav-btn) {
    width: 9rem;
  }

  .login-nav-btn {
    border-radius: 0.5rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    height: 2.2rem;
    align-items: center;
    z-index: 50;
    padding-left: 2rem;
    padding-right: 2rem;
    min-width: 6rem;
  }

  .user-container {
    position: relative;
  }

  .user-menu {
    position: absolute;
    min-width: 100%;
    top: 4.1rem;
    background-color: #222020;
    box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.75);
    border-bottom: none;
    z-index: -1;
  }

  .user-menu .nav-item:first-child .nav-btn {
    padding-top: 2rem;
  }

  .user-menu .nav-item:last-child {
    border-top: 1px #4b4b4b dashed;
  }

  .user-menu .nav-btn {
    min-width: 10rem !important;
    width: 100% !important;
  }
}
</style>
