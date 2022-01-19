<template>
  <div>
    <v-hover v-if="getPlayingMusic" v-slot="{ hover }">
      <v-card ref="musicPlayer" id="musicPlayer" :class="{ musicPlayerMobile: $vuetify.breakpoint.mdAndDown }" tile style="position: fixed; bottom: 0; width: 100%; z-index: 100">
        <v-progress-linear ref="musicProgress" :value="musicTime" class="my-0" :height="hover ? 6 : 3"></v-progress-linear>
        <v-list>
          <v-list-item>
            <v-list-item-content class="text-truncate">
              <v-list-item-title>{{ getPlayingMusic.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                getPlayingMusic.artists
                  .map((v) => {
                    return v.name;
                  })
                  .join("&")
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.breakpoint.mdAndUp }">
              <v-btn icon>
                <v-icon>mdi-pause</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <audio @timeupdate="setMusicTime()" @canplay="canPlay()" :src="getPlayingMusic.url" ref="music"></audio>
      </v-card>
    </v-hover>
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
      setPlayingMusicDuration: "setPlayingMusicDuration",
    }),
    setMusicTime() {
      this.musicTime = (Math.floor(this.$refs.music.currentTime) / this.getPlayingMusic.duration) * 100;
    },
    playMusic(music) {
      this.setPlayingMusic(music);
    },
    canPlay() {
      this.setPlayingMusicDuration(30);
      this.$refs.music.play();
    },
  },
};
</script>
