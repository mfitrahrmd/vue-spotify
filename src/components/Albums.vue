<template>
  <div>
    <v-sheet class="pa-5">
      <v-row>
        <v-col cols="3">
          <v-sheet elevation="20">
            <v-img :aspect-ratio="1 / 1" :src="album.images[0].url"></v-img>
          </v-sheet>
        </v-col>
        <v-col cols="9" class="mt-auto">
          <div style="text-shadow: 1px -1px 5px rgba(34, 34, 34, 0.5)">
            <div class="overline text-truncate">Album</div>
            <div class="display-2 font-weight-medium text-truncate">{{ album.name }}</div>
            <div class="body-1 font-weight-light text-truncate">
              {{
                album.artists
                  .map((m) => {
                    return m.name;
                  })
                  .join(" • ")
              }}
              • <span>{{ releaseYear }}</span> • <span>{{ tracksTotal }} Songs</span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>
    </v-sheet>
    <v-container>
      <TrackList :tracks="tracks">
        <template v-slot:btnPlay="{ musicData }">
          <v-btn absolute icon title="Play Example" @click="$emit('start-music', musicData)">
            <v-icon>mdi-play</v-icon>
          </v-btn>
        </template>
        <template v-slot:btnLike="{ musicData }">
          <v-btn icon @click="like(musicData, fetchAlbum)" :title="musicData.is_liked ? 'Remove from liked' : 'Like this track'">
            <v-icon :color="musicData.is_liked ? 'pink accent-3' : ''">mdi-heart</v-icon>
          </v-btn>
        </template>
      </TrackList>
    </v-container>
  </div>
</template>

<script>
import { getAlbum } from "@/api/albums";

import TrackList from "@/components/TrackList";

import TracksMixin from "@/mixins/TracksMixin";

export default {
  data() {
    return {
      albumId: this.$route.params.id,
      album: "",
    };
  },
  components: {
    TrackList,
  },
  mixins: [TracksMixin],
  computed: {
    releaseYear: {
      get: function () {
        return new Date(this.album.release_date).getFullYear();
      },
    },
    tracksTotal: {
      get: function () {
        return this.album.tracks.total;
      },
    },
    tracks: {
      get: function () {
        return this.album.tracks.items;
      },
    },
  },
  methods: {
    fetchAlbum() {
      getAlbum(this.albumId).then((v) => {
        this.album = v.data;
      });
    },
  },
  created() {
    this.fetchAlbum();
  },
};
</script>
