import { getUserSavedTracks, checkUserSavedTracks } from "@/api/tracks";
import { mapPlaylistTracksId, mapPlaylistLikedTracks } from "@/utils/MapPlaylist";

export default {
  namespaced: true,
  state: {
    userSavedTracks: [],
  },
  mutations: {
    SET_USER_SAVED_TRACKS(state, payload) {
      state.userSavedTracks = payload;
    },
  },
  actions: {
    fetchUserSavedTracks({ commit }) {
      getUserSavedTracks()
        .then((v) => {
          const ids = mapPlaylistTracksId(v.data.items);
          checkUserSavedTracks(ids)
            .then((w) => {
              return w
                .map((m) => {
                  return m.data;
                })
                .flat();
            })
            .then((w) => {
              mapPlaylistLikedTracks(v.data.items, w);
              commit("SET_USER_SAVED_TRACKS", v.data);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    getUserSavedTracks: (state) => state.userSavedTracks.items,
  },
};
