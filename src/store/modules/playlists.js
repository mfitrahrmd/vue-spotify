import { getUserPlaylists } from "@/api/playlists";

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
      getUserPlaylists()
        .then((v) => {
          commit("SET_USER_PLAYLISTS", v.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getUserPlaylists: (state) => state.userPlaylists,
  },
};
