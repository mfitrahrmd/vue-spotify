import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import users from "./modules/users";
import tracks from "./modules/tracks";
import playlists from "./modules/playlists";
import artists from "./modules/artists";
import player from "./modules/player";
import browse from "./modules/browse";

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
    auth,
    users,
    tracks,
    playlists,
    artists,
    player,
    browse,
  },
});
