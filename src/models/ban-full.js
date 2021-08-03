import {Player} from "./player";

export class BanFull {
  constructor(
    id = 0,
    server = 0,
    recipient = new Player(),
    start = 0,
    expiration = 0,
    oldType = '',
    actualExpiration = 0,
    giver = new Player(),
    reason = '',
    newBan = 0,
    modder = new Player(),
    modificationReason = ''
  ) {
    this.update({id, server, recipient, start, expiration, oldType, actualExpiration, giver, reason, newBan,
      modder, modificationReason});
  }

  update(ban) {
    this.id = ban.id;
    this.server = ban.server;
    this.recipient = ban.recipient;
    this.start = ban.start;
    this.expiration = ban.expiration;
    if (ban.oldType === undefined) {
      this.oldType = '';
    } else {
      this.oldType = ban.oldType;
    }
    this.actualExpiration = ban.actualExpiration;
    this.giver = ban.giver;
    this.reason = ban.reason;
    this.newBan = ban.newBan;
    this.modder = ban.modder;
    this.modificationReason = ban.modificationReason;
  }
}
