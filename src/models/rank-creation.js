export class RankCreation {
  constructor(rank) {
    this.level = Number.parseInt(rank.level);
    this.name = rank.name;
    this.displayName = rank.displayName;
    this.chatFormat = rank.chatFormat;
    this.perms = rank.perms;
  }
}