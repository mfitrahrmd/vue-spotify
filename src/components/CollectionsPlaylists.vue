<template>
  <div>
    <FlickingSlider :options="{ align: 'prev' }" :plugins="plugins">
      <v-col v-for="(item, i) in getPlaylists.items" :key="i" cols="4" lg="2">
        <v-card flat>
          <v-img width="100%" v-if="item.images.length" :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
          <v-img width="100%" v-else src="https://picsum.photos/200/300" :aspect-ratio="1 / 1"></v-img>
          <v-card-title class="text-truncate text-no-wrap px-0"> {{ item.name }} </v-card-title>
          <v-card-subtitle class="text-truncate text-no-wrap px-0">
            <p>{{ item.owner.display_name }}</p>
          </v-card-subtitle>
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
