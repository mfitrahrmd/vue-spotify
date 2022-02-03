import { addUserSavedTracks, removeUserSavedTracks } from "@/api/tracks";

export default {
  methods: {
    like: function (musicData, callback) {
      // check if the track is liked or not
      if (musicData.is_liked) {
        removeUserSavedTracks(musicData.id).then(() => {
          callback();
        });
      } else {
        addUserSavedTracks(musicData.id).then(() => {
          callback();
        });
      }
    },
  },
};
