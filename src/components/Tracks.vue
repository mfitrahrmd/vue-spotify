<template>
  <div>
    <v-container style="position: relative">
      <v-btn fab absolute right color="rgba(30, 67, 86, 1)" title="Play Example"><v-icon>mdi-play</v-icon></v-btn>
      <v-row>
        <v-col cols="12" lg="3">
          <v-img width="50%" class="mx-auto" :aspect-ratio="1 / 1" :src="track.album.images[0].url"></v-img>
        </v-col>
        <v-col cols="12" lg="9">
          <div class="display-3 font-weight-medium text-truncate">{{ track.name }}</div>
          <div class="display-1 text-truncate">
            {{
              track.artists
                .map((m) => {
                  return m.name;
                })
                .join("&")
            }}
          </div>
          <div class="overline font-weight-light text-truncate">{{ track.album.name }}</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" lg="3" v-for="(item, key) in audioFeatures" :key="key">
          <v-card outlined class="text-center py-4 pa-lg-8">
            <div class="text-h6 text-lg-h4 font-weight-bold">{{ item }}</div>
            <div class="body-1 font-weight-light">{{ key }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getTrack, getTrackAudioFeatures } from "@/api/tracks";
export default {
  data() {
    return {
      trackId: this.$route.params.id,
      track: "",
    };
  },
  computed: {
    audioFeatures: {
      get: function () {
        const { acousticness, danceability, energy, instrumentalness, liveness, loudness, speechiness, tempo } = this.track.audio_features;
        return {
          acousticness,
          danceability,
          energy,
          instrumentalness,
          liveness,
          loudness,
          speechiness,
          tempo,
        };
      },
    },
  },
  methods: {
    async fetchTrack() {
      await getTrack(this.trackId).then((v) => {
        const id = v.data.id;
        getTrackAudioFeatures(id).then((w) => {
          v.data.audio_features = w.data;
          console.log(v.data);
          this.track = v.data;
        });
      });
    },
  },
  created() {
    this.fetchTrack();
  },
};
</script>
