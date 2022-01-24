import { getUserSavedTracks } from "@/api/tracks";

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
      getUserSavedTracks()
        .then((v) => {
          commit("SET_USER_SAVED_TRACKS", v.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getUserSavedTracks: (state) => state.userSavedTracks,
  },
};
