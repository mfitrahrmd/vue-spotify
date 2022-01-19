<template>
  <div>
    <v-card flat>
      <v-tabs v-model="tab">
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-tracks"> Tracks </v-tab>
        <v-tab href="#tab-playlists"> Playlists </v-tab>
        <v-tab href="#tab-artists"> Artists </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item value="tab-tracks">
          <CollectionsTracks @start-music="startMusic" />
        </v-tab-item>
        <v-tab-item value="tab-playlists">
          <CollectionsPlaylists />
        </v-tab-item>
        <v-tab-item value="tab-artists">
          <CollectionsArtists />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import CollectionsTracks from "@/components/CollectionsTracks.vue";
import CollectionsPlaylists from "@/components/CollectionsPlaylists.vue";
import CollectionsArtists from "@/components/CollectionsArtists.vue";

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    CollectionsTracks,
    CollectionsPlaylists,
    CollectionsArtists,
  },
  computed: {
    ...mapGetters("collections", {
      getSavedTracks: "getSavedTracks",
      getSavedAlbums: "getSavedAlbums",
      getSavedShows: "getSavedShows",
      getSavedEpisodes: "getSavedEpisodes",
      getFollowedArtists: "getFollowedArtists",
    }),
  },
  methods: {
    ...mapActions({
      fetchCollections: "collections/fetchCollections",
    }),
    startMusic(music) {
      this.$emit("start-music", music);
    },
  },
  created() {
    this.fetchCollections();
  },
};
</script>

<style></style>
