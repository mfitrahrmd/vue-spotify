import apiPlayer from "@/api/player";

export default {
  namespaced: true,
  state: { userRecentlyPlayedTracks: "" },
  mutations: {
    SET_USER_RECENTLY_PLAYED_TRACKS(state, payload) {
      state.userRecentlyPlayedTracks = payload;
    },
  },
  actions: {
    async fetchUserRecentlyPlayedTracks({ commit }) {
      await apiPlayer.getUserRecentlyPlayedTracks().then((v) => {
        commit("SET_USER_RECENTLY_PLAYED_TRACKS", v.data);
      });
    },
  },
  getters: {
    getUserRecentlyPlayedTracks: (state) => state.userRecentlyPlayedTracks,
  },
};
