<template>
  <v-app>
    <!-- <v-btn v-if="$vuetify.theme.dark" class="white" light icon fixed bottom right style="z-index: 999999" @click="$vuetify.theme.dark = false"><v-icon>mdi-weather-sunny</v-icon></v-btn>
    <v-btn v-else class="black" dark icon fixed bottom right style="z-index: 999999" @click="$vuetify.theme.dark = true"><v-icon>mdi-weather-night</v-icon></v-btn> -->

    <v-app-bar app dark color="rgba(30, 67, 86, 1)">
      <v-app-bar-nav-icon ref="baricon" @click="drawer = true" class="d-sm-none"></v-app-bar-nav-icon>
      <v-toolbar-title>SpoTify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn elevation="0" color="transparent" v-for="link in navLinks" :key="link.id" :to="link.link" class="d-none d-sm-flex mx-1">{{ link.title }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="loginHandler()" light>Login</v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list nav dense>
        <v-list-item-group v-for="link in navLinks" :key="link.id" v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item :to="link.link">
            <v-list-item-icon>
              <v-icon>mdi-{{ link.title.toLowerCase() }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <!-- use vuetify transition, OR you can use custom transition using
      <transition name="fade"></transition>
      tag and see the css below to define the transition behavior -->
      <v-slide-x-transition mode="out-in">
        <router-view @start-music="startMusic" />
      </v-slide-x-transition>
    </v-main>
    <MusicPlayer ref="music-player" />
  </v-app>
</template>

<script>
import MusicPlayer from "@/components/MusicPlayer";

export default {
  name: "App",
  components: {
    MusicPlayer,
  },
  data: () => ({
    //
    drawer: null,
    group: null,
    logo: "@/assets/logo.png",
    navLinks: [
      { title: "Home", link: "/" },
      { title: "Explore", link: "/explore" },
      { title: "Collections", link: "/collections" },
      { title: "Search", link: "/search" },
    ],
  }),
  methods: {
    startMusic(music) {
      console.log(music);
      this.$refs["music-player"].playMusic(music);
    },
    loginHandler() {
      window.location = `https://accounts.spotify.com/authorize?response_type=token&redirect_uri=http%3A%2F%2F192.168.64.6%3A8080%2Fauth&scope=user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20user-read-recently-played%20user-read-playback-position%20user-follow-read&client_id=7f7858ab81324701ada54b47514fa0a6`;
    },
  },
  computed: {},
};
</script>

<style>
:root {
  --userPrimary: var(#1e4356);
  --userPrimaryDark: var(#0d2735);
  --dark: var(#222222);
}
a {
  text-decoration: none;
}

.whitesmoke--text {
  color: #f4f4f4;
}

.nav-link {
  list-style: none;
  text-decoration: none;
  display: none;
}

.musicPlayerMobile {
  width: 100% !important;
}
/* transition */
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-to {
  opacity: 0;
}

.fadeSlide-enter {
  opacity: 0;
  transform: translateX(30px);
}
.fadeSlide-enter-active,
.fadeSlide-leave-active {
  transition: all 0.3s ease-out;
}
.fadeSlide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* end transition */
</style>
