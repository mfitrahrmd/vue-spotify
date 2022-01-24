<template>
  <div>
    <v-container>
      <v-row>
        <v-col lg="4">
          <v-card :loading="false" class="mx-auto" :flat="$vuetify.breakpoint.mdAndDown">
            <template slot="progress">
              <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
            </template>
            <div style="position: relative">
              <v-img class="bg-blur" :src="playlist.images[0].url"></v-img>
              <v-img :class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }" :width="$vuetify.breakpoint.mdAndDown ? '50%' : ''" :src="playlist.images[0].url"></v-img>
            </div>

            <div :class="$vuetify.breakpoint.mdAndDown ? ['d-flex', 'flex-column', 'align-center', 'text-center'] : ''">
              <v-card-title class="display-2 font-weight-medium" style="position: relative">
                <div>{{ playlist.name }}</div>
              </v-card-title>

              <v-card-subtitle>
                <div>By {{ playlist.owner.display_name }}</div>
                <div class="my-3">{{ playlist.tracks.total }} Tracks</div>
              </v-card-subtitle>

              <v-divider class="mx-4"></v-divider>

              <v-card-text> {{ playlist.description }} </v-card-text>
            </div>
          </v-card>
        </v-col>

        <v-col lg="8">
          <v-simple-table fixed-header :height="!$vuetify.breakpoint.mdAndDown ? '75vh' : ''">
            <template v-slot:default>
              <thead>
                <tr v-if="!$vuetify.breakpoint.mdAndDown">
                  <th class="text-left"></th>
                  <th class="text-left">Title</th>
                  <th class="text-left">Album</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in getPlaylistTracks.items" :key="i">
                  <td>
                    <v-avatar tile>
                      <v-img gradient="to top right, rgba(255,255,255,0), rgba(0,0,0,.4)" :src="item.track.album.images[2].url"></v-img>
                      <v-btn absolute icon title="Play Example" @click="$emit('start-music', { url: item.track.preview_url, name: item.track.name, artists: item.track.artists })">
                        <v-icon>mdi-play</v-icon>
                      </v-btn>
                    </v-avatar>
                  </td>
                  <td>
                    <p class="my-1">{{ item.track.name }}</p>
                    <p class="my-1 font-weight-medium">
                      {{
                        item.track.artists
                          .map((v) => {
                            return v.name;
                          })
                          .join("&")
                      }}
                    </p>
                  </td>
                  <td v-if="!$vuetify.breakpoint.mdAndDown">
                    <p>{{ item.track.album.name }}</p>
                  </td>
                  <td>
                    <v-btn icon @click="like(item.track, fetchPlaylist())" :title="item.track.is_liked ? 'Remove from liked' : 'Like this track'">
                      <v-icon :color="item.track.is_liked ? 'pink accent-3' : ''">mdi-heart</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getPlaylist } from "@/api/playlists";
import { checkUserSavedTracks } from "@/api/tracks";
import TracksMixin from "@/mixins/TracksMixin";
import { mapPlaylistTracksId, mapPlaylistLikedTracks } from "@/utils/MapPlaylist";
export default {
  data() {
    return {
      playlistId: this.$route.params.id, // Get playlist id from url
      playlist: "",
    };
  },
  mixins: [TracksMixin],
  computed: {
    getPlaylist() {
      return this.playlist;
    },
    getPlaylistTracks() {
      return this.playlist.tracks;
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
