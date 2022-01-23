import apiTracks from "@/api/tracks";

export default {
  namespaced: true,
  state: {
    userSavedTracks: "",
  },
  mutations: {
    SET_USER_SAVED_TRACKS(state, payload) {
      state.userSavedTracks = payload;
    },
  },
  actions: {
    fetchUserSavedTracks({ commit }) {
      apiTracks.getUserSavedTracks().then((v) => {
        commit("SET_USER_SAVED_TRACKS", v.data);
      });
    },
  },
  getters: {
    getUserSavedTracks: (state) => state.userSavedTracks,
  },
};
