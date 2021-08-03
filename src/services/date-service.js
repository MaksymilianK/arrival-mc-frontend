import dateformat from "dateformat";

export const dateService = {
  toInputString(date) {
    return dateformat(date, 'yyyy-mm-dd');
  },

  toString(dateTime) {
    return dateformat(dateTime, 'dd.mm.yyyy hh:MM:ss');
  }
}