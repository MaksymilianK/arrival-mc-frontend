export class RankFull {
  constructor(
      id = null,
      level = null,
      name = '',
      displayName = '',
      chatFormat = '',
      perms = {}
  ) {
    this.update({id, level, name, displayName, chatFormat, perms});
  }

  update(rank) {
    this.id = rank.id;
    this.level = rank.level;
    this.name = rank.name;
    this.displayName = rank.displayName;
    this.chatFormat = rank.chatFormat;

    this.perms = new Map();
    Object.entries(rank.perms).forEach(([server, perms]) => {
      this.perms.set(Number.parseInt(server), new Set(perms));
    });
  }
}