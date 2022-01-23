<template>
  <div>
    <v-sheet class="mx-auto">
      <v-slide-group show-arrows>
        <v-slide-item v-for="(item, i) in getUserFollowedArtists.artists.items" :key="i" class="mx-1 mx-lg-3">
          <v-card flat :width="$vuetify.breakpoint.smAndDown ? 150 : 250">
            <v-img :aspect-ratio="1 / 1" :src="item.images[0].url" style="border-radius: 50%"></v-img>
            <v-card-title :title="item.name" class="text-truncate text-no-wrap"> {{ item.name }} </v-card-title>
            <v-card-subtitle :title="item.genres.join(' / ')" class="text-truncate text-no-wrap">{{ item.genres.join(" / ") }} </v-card-subtitle>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters("artists", {
      getUserFollowedArtists: "getUserFollowedArtists",
    }),
  },
  methods: {
    ...mapActions("artists", {
      fetchUserFollowedArtists: "fetchUserFollowedArtists",
    }),
  },
  created() {
    this.fetchUserFollowedArtists();
  },
};
</script>
