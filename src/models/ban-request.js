import {dateService} from "../services/date-service";

export class BanRequest {
  constructor(page = 0, size = 0, server = 0, recipient = '',
              startFrom = new Date(), startTo = new Date(),
              expirationFrom = new Date(), expirationTo = new Date()) {
    this.page = page;
    this.size = size;
    this.server = server;
    this.recipient = recipient;
    this.startFrom = dateService.toInputString(startFrom);
    this.startTo = dateService.toInputString(startTo);
    this.expirationFrom = dateService.toInputString(expirationFrom);
    this.expirationTo = dateService.toInputString(expirationTo);
  }
}