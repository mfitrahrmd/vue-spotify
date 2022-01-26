<template>
  <div>
    <v-container>
      <v-row>
        <v-col lg="4">
          <v-card :loading="false" class="mx-auto" :flat="$vuetify.breakpoint.mdAndDown">
            <div style="position: relative">
              <v-img class="bg-blur" :class="{ 'd-none': !$vuetify.breakpoint.mdAndDown }" :src="playlist.images[0].url"></v-img>
              <v-img :class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }" :width="$vuetify.breakpoint.mdAndDown ? '50%' : ''" :src="playlist.images[0].url"></v-img>
            </div>

            <div :class="$vuetify.breakpoint.mdAndDown ? ['d-flex', 'flex-column', 'align-center', 'text-center'] : ''">
              <div class="display-2 mx-5 text-truncate">{{ playlist.name }}</div>

              <div class="subtitle-1 mx-5 text-truncate">By {{ playlist.owner.display_name }}</div>
              <div class="title mx-5 mt-5 text-truncate">{{ playlist.tracks.total }} Tracks</div>

              <v-divider class="mx-4"></v-divider>

              <v-card-text> {{ playlist.description }} </v-card-text>
            </div>
          </v-card>
        </v-col>

        <v-col lg="8">
          <TrackList :tracks="tracks">
            <template v-slot:btnPlay="{ musicData }">
              <v-btn absolute icon title="Play Example" @click="$emit('start-music', musicData)">
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </template>
            <template v-slot:btnLike="{ musicData }">
              <v-btn icon @click="like(musicData, fetchPlaylist)" :title="musicData.is_liked ? 'Remove from liked' : 'Like this track'">
                <v-icon :color="musicData.is_liked ? 'pink accent-3' : ''">mdi-heart</v-icon>
              </v-btn>
            </template>
          </TrackList>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getPlaylist } from "@/api/playlists";
import { checkUserSavedTracks } from "@/api/tracks";

import TrackList from "@/components/TrackList";

import TracksMixin from "@/mixins/TracksMixin";

import { mapPlaylistTracksId, mapPlaylistLikedTracks } from "@/utils/MapPlaylist";

export default {
  data() {
    return {
      playlistId: this.$route.params.id, // Get playlist id from url
      playlist: "",
    };
  },
  components: {
    TrackList,
  },
  mixins: [TracksMixin],
  computed: {
    getPlaylist() {
      return this.playlist;
    },
    tracks: {
      get: function () {
        return this.playlist.tracks.items.map((m) => {
          return m.track;
        });
      },
    },
  },
  methods: {
    async fetchPlaylist() {
      await getPlaylist(this.playlistId).then((v) => {
        // map tracks id inside the playlist
        const ids = mapPlaylistTracksId(v.data.tracks.items);
        // check each tracks in playlist if liked
        checkUserSavedTracks(ids).then((w) => {
          mapPlaylistLikedTracks(v.data.tracks.items, w.data);
          // update playlist data
          this.playlist = v.data;
        });
      });
    },
  },
  async created() {
    await this.fetchPlaylist();
  },
};
</script>

<style scoped>
.bg-blur {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(5px);
}
</style>
