<template>
  <div>
    <div class="mx-lg-10">
      <h1>New Releases</h1>
      <Swiper :items="getNewReleases.albums.items" :options="{ ...swiperOptions, spaceBetween: isMobile ? 10 : 25, slidesPerView: isMobile ? 2 : 5, slidesPerGroup: isMobile ? 2 : 5 }" class="mb-10">
        <template v-slot="{ item }">
          <v-menu tile bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click.prevent style="z-index: 100" absolute icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense tile>
              <v-list-item>
                <a :href="item.external_urls.spotify" target="blank">Open in Spotify</a>
              </v-list-item>
            </v-list>
          </v-menu>
          <router-link :to="'/albums/' + item.id">
            <v-card>
              <v-img :aspect-ratio="1 / 1" :src="item.images.length ? item.images[0].url : 'https://dummyimage.com/300x300&text=No%20image'"></v-img>
              <div class="text-truncate mx-auto" style="width: 90%">
                <v-card-text class="pa-0 ma-0">
                  <p class="text-end">{{ item.album_type }}</p>
                  <div class="text-truncate title my-3">
                    {{ item.name }}
                  </div>
                  <div class="text-truncate">
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
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </template>
      </Swiper>

      <h1>Featured Playlists</h1>
      <Swiper :items="getFeaturedPlaylists.playlists.items" :options="{ ...swiperOptions, spaceBetween: isMobile ? 10 : 25, slidesPerView: isMobile ? 2 : 5, slidesPerGroup: isMobile ? 2 : 5 }" class="mb-10">
        <template v-slot="{ item }">
          <v-menu tile bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click.prevent style="z-index: 100" absolute icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense tile>
              <v-list-item>
                <a :href="item.external_urls.spotify" target="blank">Open in Spotify</a>
              </v-list-item>
            </v-list>
          </v-menu>
          <router-link :to="'/playlists/' + item.id">
            <v-card>
              <v-img :aspect-ratio="1 / 1" :src="item.images.length ? item.images[0].url : 'https://dummyimage.com/300x300&text=No%20image'"></v-img>
              <div class="text-truncate mx-auto" style="width: 90%">
                <v-card-text class="pa-0 ma-0">
                  <div class="text-truncate title my-3">
                    {{ item.name }}
                  </div>
                  <div class="text-truncate">
                    {{ item.description }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </template>
      </Swiper>

      <h1>Recently Played</h1>
      <Swiper :items="getUserRecentlyPlayedTracks.items" :options="{ ...swiperOptions, spaceBetween: isMobile ? 10 : 25, slidesPerView: isMobile ? 1 : 3, slidesPerGroup: isMobile ? 1 : 3 }" class="mb-10">
        <template v-slot="{ item }">
          <v-card elevation="10">
            <v-container fluid>
              <v-row>
                <v-col cols="auto">
                  <v-avatar tile><v-img :src="item.track.album.images[0].url"></v-img></v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-card-text class="pa-0 ma-0">
                    <div class="text-truncate title">
                      {{ item.track.name }}
                    </div>
                    <div class="text-truncate">
                      {{
                        item.track.artists
                          .map((v) => {
                            return v.name;
                          })
                          .join("&")
                      }}
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="auto">
                  <div style="display: flex; gap: 10px">
                    <v-btn fab x-small @click="like(item.track, fetchUserRecentlyPlayedTracks())" title="Like this track"><v-icon :color="item.track.is_liked ? 'pink accent-3' : 'grey'">mdi-heart</v-icon></v-btn>
                    <v-btn fab x-small v-if="item.track.preview_url" @click="$emit('start-music', item.track)" title="Play Example"><v-icon>mdi-play</v-icon></v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </template>
      </Swiper>
    </div>
  </div>
</template>

<script>
// Maping vuex to use spread operator
import { mapGetters, mapActions } from "vuex";

import TracksMixin from "@/mixins/TracksMixin";
import Swiper from "../components/Swiper.vue";

export default {
  data() {
    return {
      swiperOptions: {
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
        spaceBetween: 10,
      },
    };
  },
  components: {
    Swiper,
  },
  mixins: [TracksMixin],
  computed: {
    ...mapGetters({
      getUserRecentlyPlayedTracks: "player/getUserRecentlyPlayedTracks",
      getNewReleases: "browse/getNewReleases",
      getFeaturedPlaylists: "browse/getFeaturedPlaylists",
    }),
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown ? true : false;
    },
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
