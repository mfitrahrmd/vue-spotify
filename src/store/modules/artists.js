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
    fetchUserFollowedArtists({ commit }) {
      getUserFollowedArtists()
        .then((v) => {
          commit("SET_USER_FOLLOWED_ARTISTS", v.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getUserFollowedArtists: (state) => state.userFollowedArtists,
  },
};
