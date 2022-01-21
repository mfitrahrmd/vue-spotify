import Vue from "vue";
import Vuex from "vuex";

import collections from "./modules/collections";
import explore from "./modules/explore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playingMusic: "",
  },
  mutations: {
    SET_PLAYING_MUSIC(state, payload) {
      state.playingMusic = payload;
    },
    SET_PLAYING_INFO(state, payload) {
      state.playingMusic = { ...state.playingMusic, ...payload };
    },
  },
  actions: {
    setPlayingMusic(context, payload) {
      context.commit("SET_PLAYING_MUSIC", payload);
    },
    setPlayingInfo(context, payload) {
      context.commit("SET_PLAYING_INFO", payload);
    },
  },
  getters: {
    getPlayingMusic: (state) => state.playingMusic,
  },
  modules: {
    collections,
    explore,
  },
});
