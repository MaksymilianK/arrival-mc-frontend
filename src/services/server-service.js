import {httpService} from "./http-service";
import {reactive} from "vue";

export const serverService = {
  _servers: reactive(new Map()),

  get servers() {
    if (this._servers.size === 0) {
      httpService.get('servers')
        .then(res => res.data.servers.forEach(s => this._servers.set(s.id, s.name)))
        .catch(err => console.log(err));
    }
    return this._servers;
  }
}