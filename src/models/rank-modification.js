import {RankFull} from "./rank-full";

export class RankModification {
  constructor(rank, rankForm) {
    this.level = rank.level === Number.parseInt(rankForm.level) ? null : Number.parseInt(rankForm.level);
    this.name = rank.name === rankForm.name ? null : rankForm.name;
    this.displayName = rank.displayName === rankForm.displayName ? null : rankForm.displayName;
    this.chatFormat = rank.chatFormat === rankForm.chatFormat ? null : rankForm.chatFormat;

    this.removedPerms = new Map();
    this.addedPerms = new Map();
    console.log(...Object.values(rank));

    rank = new RankFull(...Object.values(rank));
    for (let [server, serverPerms] of rank.perms.entries()) {
      for (let p of serverPerms) {
        if (!rankForm.perms.has(server)) {
          rankForm.perms.set(server, new Set());
        }
        if (!rankForm.perms.get(server).has(p)) {
          if (!this.removedPerms.has(server)) {
            this.removedPerms.set(server, new Set());
          }
          this.removedPerms.get(server).add(p);
        }
      }
    }

    for (let [server, serverPerms] of rankForm.perms.entries()) {
      for (let p of serverPerms) {
        if (!rank.perms.has(server)) {
          rank.perms.set(server, new Set());
        }
        if (!rank.perms.get(server).has(p)) {
          console.log(rank.perms.get(server));
          console.log(p);
          if (!this.addedPerms.has(server)) {
            this.addedPerms.set(server, new Set());
          }
          this.addedPerms.get(server).add(p);
        }
      }
    }
  }
}