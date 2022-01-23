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
  computed: {},
  methods: {
    startMusic(music) {
      this.$emit("start-music", music);
    },
  },
  created() {},
};
</script>

<style></style>
