<template>
  <div class="mt-16 pt-16">
    <v-card v-if="getPlayingMusic" ref="musicPlayer" id="musicPlayer" :class="{ musicPlayerMobile: $vuetify.breakpoint.mdAndDown }" tile style="position: fixed; bottom: 0; width: 100%; z-index: 100">
      <v-progress-linear ref="musicProgress" :value="musicTime" class="my-0"></v-progress-linear>
      <v-list>
        <v-list-item>
          <v-list-item-content class="text-truncate">
            <v-hover v-if="getPlayingMusic" v-slot="{ hover }">
              <router-link :to="'/tracks/' + getPlayingMusic.id">
                <v-list-item-title :class="{ 'text-decoration-underline': hover }">{{ getPlayingMusic.name }}</v-list-item-title>
              </router-link>
            </v-hover>
            <v-hover v-if="getPlayingMusic" v-slot="{ hover }">
              <router-link :to="'/artists/' + getPlayingMusic.id">
                <v-list-item-subtitle :class="{ 'text-decoration-underline': hover }">
                  <a href="">
                    {{
                      getPlayingMusic.artists
                        .map((v) => {
                          return v.name;
                        })
                        .join("&")
                    }}</a
                  ></v-list-item-subtitle
                >
              </router-link>
            </v-hover>
          </v-list-item-content>

          <v-spacer></v-spacer>

          <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
            <v-btn icon @click="pauseresumse()">
              <v-icon>{{ getPlayingMusic.isPaused ? "mdi-play" : "mdi-pause" }}</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <audio @timeupdate="setMusicTime()" @canplay="canPlay()" :src="getPlayingMusic.preview_url || ''" ref="music"></audio>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MusicPlayer",
  data() {
    return {
      musicTime: 0,
    };
  },
  props: {},
  components: {},
  computed: {
    ...mapGetters({
      getPlayingMusic: "getPlayingMusic",
    }),
  },
  methods: {
    ...mapActions({
      setPlayingMusic: "setPlayingMusic",
      setPlayingInfo: "setPlayingInfo",
    }),
    setMusicTime() {
      this.musicTime = (this.$refs.music.currentTime / this.$refs.music.duration) * 100;
    },
    async playMusic(music) {
      await this.setPlayingMusic(music);
    },
    canPlay() {
      this.$refs.music.play();
      this.setPlayingInfo({ isPaused: this.$refs.music.paused });
    },
    pauseresumse() {
      if (this.$refs.music.paused) {
        this.$refs.music.play();
        this.setPlayingInfo({ isPaused: this.$refs.music.paused });
      } else {
        this.$refs.music.pause();
        this.setPlayingInfo({ isPaused: this.$refs.music.paused });
      }
    },
  },
  created() {},
};
</script>

<style scoped>
a {
  color: inherit !important;
}
</style>
