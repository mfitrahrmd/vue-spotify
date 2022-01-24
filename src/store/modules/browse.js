import { getNewReleases, getFeaturedPlaylists } from "@/api/browse";

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
      await getNewReleases()
        .then((v) => {
          commit("SET_NEW_RELEASES", v.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async fetchFeaturedPlaylists({ commit }) {
      await getFeaturedPlaylists()
        .then((v) => {
          commit("SET_FEATURED_PLAYLISTS", v.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getNewReleases: (state) => state.newReleases,
    getFeaturedPlaylists: (state) => state.featuredPlaylists,
  },
};
