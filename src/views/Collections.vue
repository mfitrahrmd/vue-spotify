<template>
  <div>
    <v-card flat>
      <v-tabs v-model="tab">
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-tracks"> Tracks </v-tab>
        <v-tab href="#tab-playlists"> Playlists </v-tab>
      </v-tabs>
      <keep-alive>
        <v-tabs-items v-model="tab" touchless>
          <v-tab-item value="tab-tracks">
            <CollectionsTracks @start-music="startMusic" />
          </v-tab-item>
          <v-tab-item value="tab-playlists">
            <CollectionsPlaylists />
          </v-tab-item>
        </v-tabs-items>
      </keep-alive>
    </v-card>
  </div>
</template>

<script>
import CollectionsTracks from "@/components/CollectionsTracks.vue";
import CollectionsPlaylists from "@/components/CollectionsPlaylists.vue";

export default {
  data() {
    return {
      tab: null,
    };
  },
  components: {
    CollectionsTracks,
    CollectionsPlaylists,
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
