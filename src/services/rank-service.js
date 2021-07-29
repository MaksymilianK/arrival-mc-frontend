import {httpService} from "./http-service";
import {reactive} from "vue";

export const rankService = {
  _ranks: reactive(new Map()),

  get ranks() {
    if (this._ranks.size === 0) {
      this.loadRanks();
    }
    return this._ranks;
  },

  loadRanks() {
    return httpService.get('ranks')
      .then(res => {
        this._ranks.clear();
        res.data.ranks.forEach(r => this._ranks.set(r.id, r));
      })
      .catch(err => console.log(err));
  },

  getRank(id) {
    return httpService.get(`ranks/${id}`);
  },

  createRank(rank) {
    return httpService.post('ranks', rank)
      .then(res => {
        this.loadRanks();
        return res;
      });
  },

  modifyRank(id, rank) {
    return httpService.patch(`ranks/${id}`, rank)
      .then(res => {
        this.loadRanks();
        return res;
      });
  },

  removeRank(id) {
    return httpService.delete(`ranks/${id}`)
      .then(res => {
        this.loadRanks();
        return res;
      });
  }
}