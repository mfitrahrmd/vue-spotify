<template>
  <div style="height: 2000px">
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
        <v-col cols="8" lg="2" v-for="(item, i) in getNewReleases.albums.items" :key="i">
          <v-card flat>
            <v-img :aspect-ratio="1 / 1" :src="item.images[1].url"></v-img>
            <v-card-text class="pa-0 text-truncate" style="position: relative">
              <h4 class="text-truncate" :title="item.name">{{ item.name }}</h4>
              <p>
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
      </FlickingSlider>

      <h1>Featured Playlists</h1>
      <FlickingSlider :options="{ align: 'prev' }" :plugins="featuredPlaylists">
        <v-col cols="8" lg="2" v-for="(item, i) in getFeaturedPlaylists.playlists.items" :key="i">
          <v-card flat>
            <v-img :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
            <v-card-text class="pa-0 text-truncate" style="position: relative">
              <h3 class="text-truncate" :title="item.name">{{ item.name }}</h3>
              <p class="text-truncate" :title="item.description" v-html="item.description"></p>
              <p>{{ item.album_type }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </FlickingSlider>

      <h1>Recently Played</h1>
      <FlickingSlider :plugins="recentlyPlayed">
        <v-col cols="8" lg="4" v-for="(item, i) in getRecentlyPlayed.items" :key="i">
          <v-card>
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
                  <v-btn title="Like" color="pink accent-2" class="white--text" x-small depressed fab><v-icon>mdi-heart-outline</v-icon></v-btn>
                  <v-btn title="Share" x-small depressed fab><v-icon>mdi-share-variant-outline</v-icon></v-btn>
                  <v-btn v-if="item.track.preview_url" @click="$emit('start-music', { url: item.track.preview_url, name: item.track.name, artists: item.track.artists })" title="Play Example" x-small depressed fab
                    ><v-icon>mdi-play</v-icon></v-btn
                  >
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="item.track.album.images[1].url"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
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
  computed: {
    ...mapGetters("explore", {
      getNewReleases: "getNewReleases",
      getFeaturedPlaylists: "getFeaturedPlaylists",
      getRecentlyPlayed: "getRecentlyPlayed",
    }),
  },
  methods: {
    ...mapActions({
      fetchExplore: "explore/fetchExplore",
    }),
  },
  async created() {
    await this.fetchExplore();
  },
};
</script>

<style scoped></style>
