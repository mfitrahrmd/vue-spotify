<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr v-if="!$vuetify.breakpoint.mdAndDown">
            <th class="text-left"></th>
            <th class="text-left">Title</th>
            <th class="text-left">Album</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in tracks" :key="i">
            <td>
              <v-avatar tile>
                <v-img gradient="to top right, rgba(255,255,255,0), rgba(0,0,0,.4)" :src="item.track.album.images[2].url"></v-img>
                <slot name="btnPlay" :musicData="{ url: item.track.preview_url, name: item.track.name, artists: item.track.artists }"></slot>
              </v-avatar>
            </td>
            <td>
              <v-hover v-slot="{ hover }">
                <router-link style="color: inherit" :to="'/tracks/' + item.track.id">
                  <p class="d-inline" :class="{ 'text-decoration-underline': hover }">{{ item.track.name }}</p>
                </router-link>
              </v-hover>
              <v-spacer></v-spacer>
              <v-hover v-slot="{ hover }">
                <router-link style="color: inherit" :to="'/artists/' + item.track.id">
                  <p class="d-inline font-weight-medium" :class="{ 'text-decoration-underline': hover }">
                    {{
                      item.track.artists
                        .map((v) => {
                          return v.name;
                        })
                        .join("&")
                    }}
                  </p>
                </router-link>
              </v-hover>
            </td>
            <td v-if="!$vuetify.breakpoint.mdAndDown">
              <v-hover v-slot="{ hover }">
                <router-link style="color: inherit" :to="'/albums/' + item.track.id">
                  <p class="d-inline" :class="{ 'text-decoration-underline': hover }">{{ item.track.album.name }}</p>
                </router-link>
              </v-hover>
            </td>
            <td>
              <slot name="btnLike" :musicData="{ id: item.track.id, is_liked: item.track.is_liked }"></slot>
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
