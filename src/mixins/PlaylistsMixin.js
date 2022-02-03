import { removeTrackFromPlaylist } from "@/api/playlists";

export default {
  methods: {
    removeTrackFromPlaylist: function ({ playlistId, musicData }, callback) {
      try {
        removeTrackFromPlaylist(playlistId, { tracks: [{ uri: musicData.uri }] }).then(() => {
          callback();
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
