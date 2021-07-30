export class BanRequest {
  constructor(page = 0, size = 0, server = 0, recipient = '',
              startFrom = new Date(0), startTo = new Date(1000000000),
              expirationFrom = new Date(1), expirationTo = new Date(1000000001)) {
    this.page = page;
    this.size = size;
    this.server = server;
    this.recipient = recipient;
    this.startFrom = startFrom;
    this.startTo = startTo;
    this.expirationFrom = expirationFrom;
    this.expirationTo = expirationTo;
  }
}