import { addUserSavedTracks, removeUserSavedTracks } from "@/api/tracks";

export default {
  methods: {
    like: function (p, callback) {
      // check if the track is liked or not
      if (p.is_liked) {
        removeUserSavedTracks(p.id).then(() => {
          callback();
        });
      } else {
        addUserSavedTracks(p.id).then(() => {
          callback();
        });
      }
    },
  },
};
