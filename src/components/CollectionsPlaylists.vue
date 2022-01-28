<template>
  <div>
    <v-sheet class="mx-auto">
      <v-slide-group show-arrows>
        <v-slide-item v-for="(item, i) in getUserPlaylists.items" :key="i" class="mx-1 mx-lg-3">
          <router-link :to="'/playlists/' + item.id">
            <v-card flat :width="$vuetify.breakpoint.smAndDown ? 100 : 200">
              <v-img width="100%" v-if="item.images.length" :aspect-ratio="1 / 1" :src="item.images[0].url"></v-img>
              <v-img width="100%" v-else src="https://picsum.photos/200/300" :aspect-ratio="1 / 1"></v-img>
              <v-card-title class="text-truncate text-no-wrap px-0"> {{ item.name }} </v-card-title>
              <v-card-subtitle class="text-truncate text-no-wrap px-0">
                <p>{{ item.owner.display_name }}</p>
              </v-card-subtitle>
            </v-card>
          </router-link>
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
    ...mapGetters("playlists", {
      getUserPlaylists: "getUserPlaylists",
    }),
  },
  methods: {
    ...mapActions("playlists", {
      fetchUserPlaylists: "fetchUserPlaylists",
    }),
  },
  created() {
    this.fetchUserPlaylists();
  },
};
</script>
