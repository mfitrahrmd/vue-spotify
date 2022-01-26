import { followArtist, unfollowArtist } from "@/api/artists";

export default {
  methods: {
    follow: function (p, callback) {
      if (p.is_following) {
        unfollowArtist(p.id).then(() => {
          callback();
        });
      } else {
        followArtist(p.id).then(() => {
          callback();
        });
      }
    },
  },
};
