import API from "./index";

export default {
  async getUserRecentlyPlayedTracks() {
    return await API({
      url: "/me/player/recently-played",
      method: "GET",
    });
  },
};
