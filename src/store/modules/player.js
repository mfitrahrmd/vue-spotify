import { getUserRecentlyPlayedTracks } from "@/api/player";
import { checkUserSavedTracks } from "@/api/tracks";
import { mapPlaylistTracksId, mapPlaylistLikedTracks } from "@/utils/MapPlaylist";

export default {
  namespaced: true,
  state: { userRecentlyPlayedTracks: "" },
  mutations: {
    SET_USER_RECENTLY_PLAYED_TRACKS(state, payload) {
      state.userRecentlyPlayedTracks = payload;
    },
  },
  actions: {
    async fetchUserRecentlyPlayedTracks({ commit }) {
      await getUserRecentlyPlayedTracks()
        .then((v) => {
          const ids = mapPlaylistTracksId(v.data.items);
          checkUserSavedTracks(ids).then((w) => {
            mapPlaylistLikedTracks(v.data.items, w.data);
            commit("SET_USER_RECENTLY_PLAYED_TRACKS", v.data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getUserRecentlyPlayedTracks: (state) => state.userRecentlyPlayedTracks,
  },
};
