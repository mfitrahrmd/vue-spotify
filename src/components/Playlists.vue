<template>
  <div>
    <v-container>
      <v-row>
        <v-col lg="4">
          <v-card :loading="false" class="mx-auto" :flat="$vuetify.breakpoint.mdAndDown">
            <div style="position: relative">
              <v-btn fab icon absolute title="Change image"><v-icon>mdi-camera</v-icon></v-btn>
              <v-img class="bg-blur" :aspect-ratio="1 / 1" :class="{ 'd-none': !$vuetify.breakpoint.mdAndDown }" :src="playlist.images.length ? playlist.images[0].url : 'https://dummyimage.com/300x300&text=No%20image'"></v-img>
              <v-img
                :aspect-ratio="1 / 1"
                :class="{ 'mx-auto': $vuetify.breakpoint.mdAndDown }"
                :width="$vuetify.breakpoint.mdAndDown ? '50%' : ''"
                :src="playlist.images.length ? playlist.images[0].url : 'https://dummyimage.com/300x300&text=No%20image'"
              ></v-img>
            </div>

            <div :class="$vuetify.breakpoint.mdAndDown ? ['d-flex', 'flex-column', 'align-center', 'text-center'] : ''">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on"> <v-icon>mdi-pencil</v-icon> </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-form ref="form">
                      <v-text-field v-model="form.playlistName" placeholder="Playlist name"></v-text-field>
                      <v-text-field v-model="form.playlistDescription" placeholder="Playlist description"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="dialogSubmit"> Save </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <div class="display-2 mx-5 text-truncate">{{ playlist.name }}</div>

              <div class="subtitle-1 mx-5 text-truncate">By {{ playlist.owner.display_name }}</div>
              <div class="title mx-5 mt-5 text-truncate">{{ playlist.tracks.total }} Tracks</div>

              <v-divider class="mx-4"></v-divider>

              <v-card-text v-html="playlist.description"> </v-card-text>
            </div>
          </v-card>
        </v-col>

        <v-col lg="8" class="d-flex flex-column">
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
            <template v-if="isUsersPlaylist" v-slot:btnMenu="{ musicData }">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click.prevent icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dense tile>
                  <v-list-item-group color="primary">
                    <v-list-item @click="removeTrackFromPlaylist({ playlistId, musicData }, fetchPlaylist)">
                      <v-list-item-content>
                        <div class="red--text">Remove from this Playlist</div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </template>
          </TrackList>
          <v-btn v-if="showBtnLoad" @click="loadMore" class="align-self-center">Load More</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getPlaylist, changePlaylistDetails } from "@/api/playlists";
import { checkUserSavedTracks } from "@/api/tracks";

import { mapGetters } from "vuex";

import TrackList from "@/components/TrackList";

import TracksMixin from "@/mixins/TracksMixin";
import PlaylistsMixin from "@/mixins/PlaylistsMixin";

import { mapPlaylistTracksId, mapPlaylistLikedTracks } from "@/utils/MapPlaylist";

export default {
  data() {
    return {
      dialog: false,
      form: {
        playlistName: "",
        playlistDescription: "",
      },
      playlistId: this.$route.params.id, // Get playlist id from url
      playlist: "",
      loaded: 10,
      showBtnLoad: true,
    };
  },
  components: {
    TrackList,
  },
  mixins: [TracksMixin, PlaylistsMixin],
  computed: {
    ...mapGetters("users", {
      getUserProfile: "getUserProfile",
    }),
    tracks: {
      get: function () {
        return this.playlist.tracks.items
          .map((m) => {
            return m.track;
          })
          .splice(0, this.loaded);
      },
    },
    isUsersPlaylist() {
      if (this.playlist.owner.id === this.getUserProfile.id) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async fetchPlaylist() {
      await getPlaylist(this.playlistId).then((v) => {
        // map tracks id inside the playlist
        const ids = mapPlaylistTracksId(v.data.tracks.items);
        // check if each tracks in playlist is liked
        checkUserSavedTracks(ids)
          .then((w) => {
            if (Array.isArray(w)) {
              return w
                .map((m) => {
                  return m.data;
                })
                .flat();
            } else {
              return w.data;
            }
          })
          .then((w) => {
            mapPlaylistLikedTracks(v.data.tracks.items, w);
            // update playlist state
            this.playlist = v.data;
          });
      });
    },
    loadMore() {
      this.loaded += 10;
      if (this.loaded >= this.playlist.tracks.items.length) {
        this.showBtnLoad = false;
      }
    },
    dialogSubmit() {
      this.dialog = false;
      changePlaylistDetails(this.playlistId, {
        name: this.form.playlistName,
        description: this.form.playlistDescription,
      })
        .then(() => {
          this.fetchPlaylist();
        })
        .catch((err) => {
          console.log(err);
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
