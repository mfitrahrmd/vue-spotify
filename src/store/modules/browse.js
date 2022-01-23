import apiBrowse from "@/api/browse";

export default {
  namespaced: true,
  state: {
    newReleases: "",
    featuredPlaylists: "",
  },
  mutations: {
    SET_NEW_RELEASES(state, payload) {
      state.newReleases = payload;
    },
    SET_FEATURED_PLAYLISTS(state, payload) {
      state.featuredPlaylists = payload;
    },
  },
  actions: {
    async fetchNewReleases({ commit }) {
      await apiBrowse.getNewReleases().then((v) => {
        commit("SET_NEW_RELEASES", v.data);
      });
    },
    async fetchFeaturedPlaylists({ commit }) {
      await apiBrowse.getFeaturedPlaylists().then((v) => {
        commit("SET_FEATURED_PLAYLISTS", v.data);
      });
    },
  },
  getters: {
    getNewReleases: (state) => state.newReleases,
    getFeaturedPlaylists: (state) => state.featuredPlaylists,
  },
};
