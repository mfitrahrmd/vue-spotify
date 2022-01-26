<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr v-if="!$vuetify.breakpoint.mdAndDown">
            <th class="text-left"></th>
            <th class="text-left">Title</th>
            <th class="text-left" v-if="tracks[0].album">Album</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in tracks" :key="i">
            <td>
              <v-avatar tile>
                <v-img v-if="item.album" gradient="to top right, rgba(255,255,255,0), rgba(0,0,0,.4)" :src="item.album.images[2].url"></v-img>
                <slot v-if="item.preview_url" name="btnPlay" :musicData="item"></slot>
              </v-avatar>
            </td>
            <td>
              <v-hover v-slot="{ hover }">
                <router-link style="color: inherit" :to="'/tracks/' + item.id">
                  <p class="d-inline" :class="{ 'text-decoration-underline': hover }">{{ item.name }}</p>
                </router-link>
              </v-hover>
              <v-spacer></v-spacer>
              <v-hover v-slot="{ hover }" v-for="artist in item.artists" :key="artist.id">
                <router-link style="color: inherit" :to="'/artists/' + artist.id">
                  <p class="d-inline font-weight-medium" :class="{ 'text-decoration-underline': hover }">
                    {{ artist.name }}
                  </p>
                </router-link>
              </v-hover>
            </td>
            <td v-if="item.album && !$vuetify.breakpoint.mdAndDown">
              <v-hover v-slot="{ hover }">
                <router-link style="color: inherit" :to="'/albums/' + item.album.id">
                  <p class="d-inline" :class="{ 'text-decoration-underline': hover }">{{ item.album.name }}</p>
                </router-link>
              </v-hover>
            </td>
            <td class="text-end">
              <slot name="btnLike" :musicData="item"></slot>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    tracks: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el) {
      el.style.opacity = 1;
    },
  },
};
</script>

<style scoped>
.slide-up-enter {
  transform: translateY(20px);
  opacity: 0;
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all ease 0.5s;
}
.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-up-move {
  transition: transform 1s ease-out;
}
</style>
