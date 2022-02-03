<template>
  <div>
    <v-container>
      <h1>New Releases</h1>
      <v-sheet class="mx-auto">
        <v-slide-group show-arrows>
          <v-slide-item v-for="(item, i) in getNewReleases.albums.items" :key="i" class="mx-1 mx-lg-3">
            <router-link :to="'/albums/' + item.id">
              <v-card flat :width="$vuetify.breakpoint.smAndDown ? 100 : 200">
                <v-menu rounded="lg" bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click.prevent style="z-index: 100000" dark absolute icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item>
                      <a :href="item.external_urls.spotify" target="blank">Open in Spotify</a>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-img :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
                <v-card-text class="pa-0">
                  <h4 class="text-truncate" :title="item.name">{{ item.name }}</h4>
                  <p
                    :title="
                      item.artists
                        .map((v) => {
                          return v.name;
                        })
                        .join('&')
                    "
                    class="text-truncate"
                  >
                    {{
                      item.artists
                        .map((v) => {
                          return v.name;
                        })
                        .join("&")
                    }}
                  </p>
                  <p>{{ item.album_type }}</p>
                </v-card-text>
              </v-card>
            </router-link>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <h1>Featured Playlists</h1>
      <v-sheet class="mx-auto">
        <v-slide-group show-arrows>
          <v-slide-item v-for="(item, i) in getFeaturedPlaylists.playlists.items" :key="i" class="mx-1 mx-lg-3">
            <router-link :to="'/playlists/' + item.id">
              <v-card flat :width="$vuetify.breakpoint.smAndDown ? 100 : 200">
                <v-menu rounded="lg" bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @click.prevent style="z-index: 100000" dark absolute icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list dense>
                    <v-list-item>
                      <a :href="item.external_urls.spotify" target="blank">Open in Spotify</a>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-img :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
                <v-card-text class="pa-0">
                  <h3 class="text-truncate" :title="item.name">{{ item.name }}</h3>
                  <p class="text-truncate" :title="item.description" v-html="item.description"></p>
                </v-card-text>
              </v-card>
            </router-link>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <h1>Recently Played</h1>
      <v-slide-group show-arrows>
        <v-slide-item v-for="(item, i) in getUserRecentlyPlayedTracks.items" :key="i" class="mx-1 mx-lg-3">
          <v-card :width="$vuetify.breakpoint.smAndDown ? 300 : 400">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div class="text-truncate">
                <v-card-title :title="item.track.name" class="text-truncate text-no-wrap">{{ item.track.name }}</v-card-title>
                <v-card-subtitle class="text-truncate text-no-wrap">{{
                  item.track.artists
                    .map((v) => {
                      return v.name;
                    })
                    .join("&")
                }}</v-card-subtitle>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn @click="like(item.track, fetchUserRecentlyPlayedTracks())" title="Like this track" x-small depressed fab><v-icon :color="item.track.is_liked ? 'pink accent-3' : 'grey'">mdi-heart</v-icon></v-btn>
                  <v-btn title="Share" x-small depressed fab><v-icon>mdi-share-variant-outline</v-icon></v-btn>
                  <v-btn v-if="item.track.preview_url" @click="$emit('start-music', item.track)" title="Play Example" x-small depressed fab><v-icon>mdi-play</v-icon></v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.track.album.images[0].url"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>
  </div>
</template>

<script>
// Maping vuex to use spread operator
import { mapGetters, mapActions } from "vuex";

import TracksMixin from "@/mixins/TracksMixin";

export default {
  data() {
    return {};
  },
  components: {},
  mixins: [TracksMixin],
  computed: {
    ...mapGetters({
      getUserRecentlyPlayedTracks: "player/getUserRecentlyPlayedTracks",
      getNewReleases: "browse/getNewReleases",
      getFeaturedPlaylists: "browse/getFeaturedPlaylists",
    }),
  },
  methods: {
    ...mapActions({
      fetchUserRecentlyPlayedTracks: "player/fetchUserRecentlyPlayedTracks",
      fetchNewReleases: "browse/fetchNewReleases",
      fetchFeaturedPlaylists: "browse/fetchFeaturedPlaylists",
    }),
  },
  async created() {
    await this.fetchUserRecentlyPlayedTracks();
    await this.fetchNewReleases();
    await this.fetchFeaturedPlaylists();
  },
};
</script>

<style scoped>
a {
  color: inherit !important;
}

.bg-primary {
  background: rgba(30, 67, 86, 1);
}
</style>
