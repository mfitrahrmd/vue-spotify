import API from "./index";

export default {
  async getNewReleases() {
    return await API({
      url: "/browse/new-releases",
      method: "GET",
    });
  },
  async getFeaturedPlaylists() {
    return await API({
      url: "/browse/featured-playlists",
      method: "GET",
    });
  },
};
