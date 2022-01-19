import apiCollections from "@/api/collections.js";

export default {
  namespaced: true,
  state: {
    collections: "",
  },
  mutations: {
    SET_COLLECTIONS(state, payload) {
      state.collections = payload;
    },
  },
  actions: {
    fetchCollections(context) {
      apiCollections
        .getCollections()
        .then((val) => {
          context.commit("SET_COLLECTIONS", val.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getPlaylists: (state) => state.collections["me-playlists"],
    getSavedTracks: (state) => state.collections["me-tracks"],
    getSavedAlbums: (state) => state.collections["me-albums"],
    getSavedShows: (state) => state.collections["me-shows"],
    getSavedEpisodes: (state) => state.collections["me-episodes"],
    getFollowedArtists: (state) => state.collections["me-following"],
  },
};
