<template>
  <div>
    <v-container>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-btn depressed width="100%">New Release</v-btn>
          </v-col>
          <v-col>
            <v-btn depressed width="100%">Top Chart</v-btn>
          </v-col>
          <v-col>
            <v-btn depressed width="100%">Music Genre</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <h1>New Releases</h1>
      <FlickingSlider :options="{ align: 'prev' }" :plugins="newReleases">
        <v-hover v-slot="{ hover }" v-for="(item, i) in getNewReleases.albums.items" :key="i">
          <v-col cols="8" lg="2" :class="{ 'text-decoration-underline': hover }">
            <v-card flat>
              <v-menu rounded="lg" bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn style="z-index: 100000" dark absolute icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title><a :href="item.external_urls.spotify" target="blank">Open in Spotify</a></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-img :class="{ 'img-overlay': hover }" :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
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
          </v-col>
        </v-hover>
      </FlickingSlider>

      <h1>Featured Playlists</h1>
      <FlickingSlider :options="{ align: 'prev' }" :plugins="featuredPlaylists">
        <v-hover v-slot="{ hover }" v-for="(item, i) in getFeaturedPlaylists.playlists.items" :key="i">
          <v-col cols="8" lg="2" :class="{ 'text-decoration-underline': hover }">
            <v-menu rounded="lg" bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon dark absolute v-bind="attrs" v-on="on" style="z-index: 80">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title><a :href="item.external_urls.spotify" target="blank">Open in Spotify</a></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <router-link :to="'/playlists/' + item.id">
              <v-card flat>
                <v-img :class="{ 'img-overlay': hover }" :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
                <v-card-text class="pa-0">
                  <h3 class="text-truncate" :title="item.name">{{ item.name }}</h3>
                  <p class="text-truncate" :title="item.description" v-html="item.description"></p>
                </v-card-text>
              </v-card>
            </router-link>
          </v-col>
        </v-hover>
      </FlickingSlider>

      <h1>Recently Played</h1>
      <FlickingSlider v-bind="{ options: { align: 'prev' } }" :plugins="recentlyPlayed">
        <v-hover v-slot="{ hover }" v-for="(item, i) in getUserRecentlyPlayedTracks.items" :key="i">
          <v-col cols="12" lg="4">
            <v-card :class="{ 'bg-primary': hover }" :dark="hover">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div class="text-truncate" style="width: 100%">
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
          </v-col>
        </v-hover>
      </FlickingSlider>
    </v-container>
  </div>
</template>

<script>
// Flicking plugins
import { Arrow } from "@egjs/flicking-plugins";

// Maping vuex to use spread operator
import { mapGetters, mapActions } from "vuex";

import FlickingSlider from "@/components/FlickingSlider.vue";

import TracksMixin from "@/mixins/TracksMixin";

export default {
  data() {
    return {
      newReleases: [new Arrow()],
      featuredPlaylists: [new Arrow()],
      recentlyPlayed: [new Arrow()],
    };
  },
  components: {
    FlickingSlider,
  },
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
.img-overlay::after {
  content: "";
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(25, 25, 25, 0.5);
}
</style>
