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
              <router-link style="color: inherit" :to="'/tracks/' + item.id">
                <p class="d-inline">{{ item.name }}</p>
              </router-link>
              <v-spacer></v-spacer>
              <router-link v-for="artist in item.artists" :key="artist.id" style="color: inherit" :to="'/artists/' + artist.id">
                <p class="d-inline font-weight-medium">
                  {{ artist.name }}
                </p>
              </router-link>
            </td>
            <td v-if="item.album && !$vuetify.breakpoint.mdAndDown">
              <router-link style="color: inherit" :to="'/albums/' + item.album.id">
                <p class="d-inline">{{ item.album.name }}</p>
              </router-link>
            </td>
            <td class="text-end">
              <div class="d-flex justify-center">
                <slot name="btnLike" :musicData="item"></slot>
                <slot name="btnMenu" :musicData="item"></slot>
              </div>
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
p:hover {
  text-decoration: underline;
}

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
