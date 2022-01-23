<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left"></th>
            <th class="text-left">Title</th>
            <th class="text-left" v-if="$vuetify.breakpoint.mdAndUp">Album</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{ 'no-preview': !item.track.preview_url }" v-for="(item, i) in getUserSavedTracks.items" :key="i" @dblclick="$emit('start-music', { url: item.track.preview_url, name: item.track.name, artists: item.track.artists })">
            <td v-text="i + 1" class="" style="width: 5px"></td>
            <td class="pa-0 ma-0"><v-img width="50px" class="my-1" :src="item.track.album.images[0].url" :aspect-ratio="1 / 1"></v-img></td>
            <td>
              <p class="pa-0 ma-0" v-text="item.track.name"></p>
              <p
                class="pa-0 ma-0"
                v-text="
                  item.track.artists
                    .map((v) => {
                      return v.name;
                    })
                    .join('&')
                "
              ></p>
            </td>
            <td v-if="$vuetify.breakpoint.mdAndUp" v-text="item.track.album.name"></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
