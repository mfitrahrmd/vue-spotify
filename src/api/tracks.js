import API from "./index";

export default {
  getUserSavedTracks() {
    return API({
      url: "/me/tracks",
      method: "GET",
      params: {
        limit: 50,
      },
    });
  },
};
