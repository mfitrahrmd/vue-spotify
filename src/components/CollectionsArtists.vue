<template>
  <div>
    <FlickingSlider :options="{ align: 'prev' }" :plugins="plugins">
      <v-col cols="6" lg="2" v-for="(item, i) in getFollowedArtists.artists.items" :key="i">
        <v-card flat>
          <v-img :aspect-ratio="1 / 1" :src="item.images[1].url" style="border-radius: 50%"></v-img>
          <v-card-title :title="item.name" class="text-truncate text-no-wrap"> {{ item.name }} </v-card-title>
          <v-card-text :title="item.genres.join(' / ')" class="text-truncate text-no-wrap">{{ item.genres.join(" / ") }} </v-card-text>
        </v-card>
      </v-col>
    </FlickingSlider>
  </div>
</template>

<script>
import FlickingSlider from "@/components/FlickingSlider.vue";

import { mapGetters } from "vuex";

import { Arrow } from "@egjs/flicking-plugins";
export default {
  data() {
    return {
      plugins: [new Arrow()],
    };
  },
  components: {
    FlickingSlider,
  },
  computed: {
    ...mapGetters("collections", {
      getFollowedArtists: "getFollowedArtists",
    }),
  },
};
</script>
