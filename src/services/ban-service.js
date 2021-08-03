import {httpService} from "./http-service";

export const banService = {
  getBans(banQuery, page, size) {
    return httpService.get('bans', {
      ...banQuery,
      page,
      size
    });
  },

  getBan(id) {
    return httpService.get(`bans/${id}`);
  }
}