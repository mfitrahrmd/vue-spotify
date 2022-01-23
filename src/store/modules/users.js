import API from "@/api";

export default {
  namespaced: true,
  state: {
    userProfile: "",
  },
  mutations: {
    SET_USER_PROFILE(state, payload) {
      state.userProfile = payload;
    },
  },
  actions: {
    getUserProfile() {
      API.getUserProfile()
        .then((v) => {
          console.log(v);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {},
};
