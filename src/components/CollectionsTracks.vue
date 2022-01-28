<template>
  <div>
    <TrackList :tracks="getUserSavedTracks.map((m) => m.track)">
      <template v-slot:btnPlay="{ musicData }">
        <v-btn absolute icon title="Play Example" @click="$emit('start-music', musicData)">
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </template>
      <template v-slot:btnLike="{ musicData }">
        <v-btn icon @click="like(musicData, fetchUserSavedTracks)" :title="musicData.is_liked ? 'Remove from liked' : 'Like this track'">
          <v-icon :color="musicData.is_liked ? 'pink accent-3' : ''">mdi-heart</v-icon>
        </v-btn>
      </template>
    </TrackList>
  </div>
</template>

<script>
import TrackList from "@/components/TrackList";

import TracksMixin from "@/mixins/TracksMixin";

import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    TrackList,
  },
  mixins: [TracksMixin],
  computed: {
    ...mapGetters("tracks", {
      getUserSavedTracks: "getUserSavedTracks",
    }),
  },
  methods: {
    ...mapActions("tracks", {
      fetchUserSavedTracks: "fetchUserSavedTracks",
    }),
  },
  created() {
    this.fetchUserSavedTracks();
  },
};
</script>

<style scoped>
.no-preview {
  opacity: 0.3;
}
</style>
