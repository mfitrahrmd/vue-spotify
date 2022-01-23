import API from "./index";

export default {
  getUserFollowedArtists() {
    return API({
      url: "/me/following",
      method: "GET",
      params: {
        limit: 50,
        type: "artist",
      },
    });
  },
};
