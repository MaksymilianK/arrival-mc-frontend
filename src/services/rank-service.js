import {httpService} from "./http-service";
import {ref} from "vue";

export const rankService = {
  _ranks: ref([]),

  get ranks() {
    if (this._ranks.value.length === 0) {
      httpService.get('ranks')
        .then(res => {
          this._ranks.value = res.data.ranks;
        })
        .catch(err => console.log(err));
    }
    return this._ranks;
  },

  getRank(id) {
    return httpService.get(`ranks/${id}`);
  }
}