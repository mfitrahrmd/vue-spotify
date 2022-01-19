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
    SET_PLAYING_MUSIC_DURATION(state, payload) {
      state.playingMusic.duration = payload;
    },
  },
  actions: {
    setPlayingMusic(context, payload) {
      context.commit("SET_PLAYING_MUSIC", payload);
    },
    setPlayingMusicDuration(context, payload) {
      context.commit("SET_PLAYING_MUSIC_DURATION", payload);
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
