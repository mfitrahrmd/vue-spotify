<template>
  <div>
    <v-navigation-drawer mini-variant expand-on-hover fixed app permanent v-if="!$vuetify.breakpoint.mdAndDown">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in 6" :key="item" link>
          <v-list-item-icon>
            <v-icon>mdi-facebook</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Title</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-sheet class="pa-lg-8" style="position: relative">
      <v-row no-gutters>
        <v-col lg="3">
          <v-img :src="artist.images[0].url" class="mx-auto" :width="$vuetify.breakpoint.mdAndDown ? '50%' : ''" style="border-radius: 50%"></v-img>
        </v-col>
        <v-col lg="9" class="mt-lg-auto">
          <div class="text-center text-lg-start">
            <div class="my-3 text-h4 text-lg-h1 font-weight-bold text-truncate">{{ artist.name }}</div>
            <div class="my-3 text-body-1 text-truncate">{{ artist.followers.total }} Followers</div>
          </div>
        </v-col>
      </v-row>
      <v-btn @click="follow(artist, fetchArtist)" :absolute="!$vuetify.breakpoint.mdAndDown" bottom right :title="artist.is_following ? 'Unfollow' : 'Follow'"
        ><v-icon>{{ artist.is_following ? "mdi-account-check" : "mdi-account-plus" }}</v-icon> {{ artist.is_following ? "Following" : "Follow" }}</v-btn
      >
    </v-sheet>
    <v-sheet>
      <v-row no-gutters>
        <v-col>
          <v-container>
            <div class="title my-5">Popular</div>
            <TrackList :tracks="tracks">
              <template v-slot:btnPlay="{ musicData }">
                <v-btn absolute icon title="Play Example" @click="$emit('start-music', musicData)">
                  <v-icon>mdi-play</v-icon>
                </v-btn>
              </template>
              <template v-slot:btnLike="{ musicData }">
                <v-btn icon @click="like(musicData, fetchArtist)" :title="musicData.is_liked ? 'Remove from liked' : 'Like this track'">
                  <v-icon :color="musicData.is_liked ? 'pink accent-3' : ''">mdi-heart</v-icon>
                </v-btn>
              </template>
            </TrackList>
          </v-container>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import TrackList from "@/components/TrackList";

import { getArtist, getArtistTopTracks, checkUserFollowsArtist } from "@/api/artists";
import { checkUserSavedTracks } from "@/api/tracks";

import ArtistsMixin from "@/mixins/ArtistsMixin";
import TracksMixin from "@/mixins/TracksMixin";

export default {
  data() {
    return {
      artistId: this.$route.params.id,
      artist: "",
      artistTracks: "",
      artistAlbums: "",
    };
  },
  components: {
    TrackList,
  },
  mixins: [TracksMixin, ArtistsMixin],
  computed: {
    tracks: {
      get: function () {
        return this.artistTracks.tracks;
      },
    },
  },
  methods: {
    fetchArtist() {
      getArtist(this.artistId).then((v) => {
        checkUserFollowsArtist(this.artistId).then((w) => {
          v.data.is_following = w.data[0];
        });
        this.artist = v.data;
      });

      getArtistTopTracks(this.artistId).then((v) => {
        const ids = v.data.tracks
          .map((m) => {
            return m.id;
          })
          .join(",");
        checkUserSavedTracks(ids).then((w) => {
          v.data.tracks.map((m, i) => {
            m.is_liked = w.data[i];
            return m;
          });
          this.artistTracks = v.data;
        });
      });
    },
  },
  created() {
    this.fetchArtist();
  },
};
</script>

<style scoped>
.v-parallax {
  transition: all 1s ease;
}
</style>
