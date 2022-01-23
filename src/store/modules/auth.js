export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
  },
  actions: {},
  getters: {
    getTokenType: (state) => state.token.token_type,
    getAccessToken: (state) => state.token.access_token,
    getTokenExpires: (state) => state.token.expires_in,
  },
};
