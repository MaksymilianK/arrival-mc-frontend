export class Player {
  constructor(nick = '', rank = -2) {
    this.update({nick, rank})
  }

  update(player) {
    this.nick = player.nick;
    this.rank = player.rank;
  }
}