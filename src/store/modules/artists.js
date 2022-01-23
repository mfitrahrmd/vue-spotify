import apiArtists from "@/api/artists";

export default {
  namespaced: true,
  state: {
    userFollowedArtists: "",
  },
  mutations: {
    SET_USER_FOLLOWED_ARTISTS(state, payload) {
      state.userFollowedArtists = payload;
    },
  },
  actions: {
    fetchUserFollowedArtists({ commit }) {
      apiArtists.getUserFollowedArtists().then((v) => {
        commit("SET_USER_FOLLOWED_ARTISTS", v.data);
      });
    },
  },
  getters: {
    getUserFollowedArtists: (state) => state.userFollowedArtists,
  },
};
