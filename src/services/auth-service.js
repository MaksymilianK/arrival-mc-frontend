import {httpService} from "./http-service";
import {Current} from "../models/current";
import {ref} from 'vue';
import {httpNotFound} from "../models/http-codes";

const sessionLifetime = 15 * 60 * 1000;
const warningTime = 30 * 1000;

export const authService = {
  _sessionTimer: null,
  sessionWarning: ref(false),
  current: ref(null),

  signIn(nick, password) {
    return httpService.put('auth/current', {nick, password})
      .then(res => {
        console.log(res);
        this.current.value = new Current(res.data.nick, res.data.rank);
        return res;
      });
  },

  signOut() {
    return httpService.delete('auth/current')
      .then(() => this.current.value = null)
  },

  getCurrent() {
    if (this._session_cookie_exists()) {
      return httpService.get('auth/current')
        .then(res => {
          this.current.value = new Current(res.data.nick, res.data.rank);
          return res;
        });
    } else {
      return Promise.reject(httpNotFound);
    }
  },

  extendSession() {
    return httpService.options('auth/current');
  },

  updateSession() {
    if (this._session_cookie_exists()) {
      this._restartTimer();
    } else {
      this._onSessionExpired();
    }
  },

  turnOffSessionWarning() {
    this.sessionWarning.value = false;
  },

  _session_cookie_exists() {
    return document.cookie.split('; ')
      .find(c => c.startsWith('SID=')) !== undefined;
  },

  _stopTimer() {
    if (this._sessionTimer) {
      clearTimeout(this._sessionTimer);
      this._sessionTimer = null;
    }
    this.sessionWarning.value = false;
  },

  _onSessionExpired() {
    this._stopTimer();
    this.current.value = null;
  },

  _restartTimer() {
    this._stopTimer();

    this._sessionTimer = setTimeout(() => {
      this.sessionWarning.value = true;
      this._sessionTimer = setTimeout(this._onSessionExpired, warningTime);
    }, sessionLifetime - warningTime);
  }
}