export class Current {
  constructor(nick, rank) {
    this.nick = nick;
    this.rank = new CurrentRank(rank.id, rank.level, rank.name, rank.displayName, rank.chatFormat, rank.perms);
  }

  hasPerm(perm) {
    return this.rank.perms.has(perm);
  }
}

export class CurrentRank {
  constructor(id, level, name, displayName, chatFormat, perms) {
    this.id = id;
    this.level = level;
    this.name = name;
    this.displayName = displayName;
    this.chatFormat = chatFormat;
    this.perms = new Set(perms);
  }
}
