<template>
  <div>
    <FlickingSlider :options="{ align: 'prev' }" :plugins="plugins">
      <v-col v-for="(item, i) in getPlaylists.items" :key="i" cols="6" lg="2">
        <v-card flat>
          <v-img width="100%" v-if="item.images.length" :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
          <v-img width="100%" v-else src="https://picsum.photos/200/300" :aspect-ratio="1 / 1"></v-img>
          <v-card-title class="pa-0"> Name </v-card-title>
          <v-divider class=""></v-divider>
          <v-card-text>
            <p>Mfitrahrmd</p>
          </v-card-text>
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
      getPlaylists: "getPlaylists",
    }),
  },
};
</script>
