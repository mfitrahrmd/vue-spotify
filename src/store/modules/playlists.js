import apiPlaylists from "@/api/playlists";

export default {
  namespaced: true,
  state: {
    userPlaylists: "",
  },
  mutations: {
    SET_USER_PLAYLISTS(state, payload) {
      state.userPlaylists = payload;
    },
  },
  actions: {
    fetchUserPlaylists({ commit }) {
      apiPlaylists.getUserPlaylists().then((v) => {
        commit("SET_USER_PLAYLISTS", v.data);
      });
    },
  },
  getters: {
    getUserPlaylists: (state) => state.userPlaylists,
  },
};
