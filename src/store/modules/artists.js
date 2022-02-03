import { getUserFollowedArtists } from "@/api/artists";

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
    async fetchUserFollowedArtists({ commit }) {
      const data = await getUserFollowedArtists();
      commit("SET_USER_FOLLOWED_ARTISTS", data);
    },
  },
  getters: {
    getUserFollowedArtists: (state) => state.userFollowedArtists,
  },
};
