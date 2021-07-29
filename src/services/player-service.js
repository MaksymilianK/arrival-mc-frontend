import {httpService} from "./http-service";

export const playerService = {
  nickRegex: /^\w{3,16}$/,
  nickPartRegex: /^\w{0,16}$/,

  isNickValid(nick) {
    return this.nickRegex.test(nick);
  },

  isNickPartValid(nick) {
    return this.nickPartRegex.test(nick);
  },

  getPlayers(nick, page, size) {
    const query = {page, size}
    if (nick) {
      query.nick = nick;
    }
    return httpService.get('players', query);
  },

  getPlayer(nick) {
    return httpService.get(`players/${nick}`);
  }
}
