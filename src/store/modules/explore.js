import apiExplore from "@/api/explore.js";

export default {
  namespaced: true,
  state: {
    explore: "",
  },
  mutations: {
    SET_EXPLORE(state, payload) {
      state.explore = payload;
    },
  },
  actions: {
    async fetchExplore(context) {
      await apiExplore
        .getExplore()
        .then((val) => {
          context.commit("SET_EXPLORE", val.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getNewReleases: (state) => state.explore["browse-new-releases"],
    getFeaturedPlaylists: (state) => state.explore["browse-featured-playlists"],
    getRecentlyPlayed: (state) => state.explore["me-player-recently-played"],
  },
};
