import API from "./index";

export default {
  getUserPlaylists() {
    return API({
      url: "/me/playlists",
      method: "GET",
      params: {
        limit: 50,
      },
    });
  },
};
