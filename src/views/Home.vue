<template>
  <div>
    <v-img src="@/assets/img/gaming_setup.jpg" class="bg-img"></v-img>
    <v-container v-if="isLoggedIn" id="home" class="whitesmoke--text pt-16" style="height: 100vh" fluid>
      <v-container class="d-flex">
        <v-avatar>
          <v-img src="@/assets/logo.png"></v-img>
        </v-avatar>
        <div class="socmed-container ms-auto">
          <v-icon class="white--text">mdi mdi-facebook</v-icon>
          <v-icon class="white--text">mdi mdi-instagram</v-icon>
          <v-icon class="white--text">mdi mdi-linkedin</v-icon>
          <v-icon class="white--text">mdi mdi-github</v-icon>
        </div>
      </v-container>
      <v-container class="main-content">
        <v-row>
          <v-col cols="4" order="2" class="d-none d-lg-block mt-16">
            <div class="text-end">
              <div>Current location :</div>
              <div class="text-h5">Palembang, Sukarami</div>
              <div>In office till 4PM</div>
            </div>
          </v-col>
          <v-col cols="8" order="1" class="mt-16">
            <div class="">
              <div class="text-h3 mb-6">Designing websites / apps for companies like <span>Google.|</span></div>
              <div class="font-italic mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed expedita error veritatis non veniam officia beatae earum molestiae! Ducimus id dicta odio eius minima quia.</div>
              <v-btn class="text-lowercase pa-5 mb-1" color="#0d2735" rounded dark>tgcfitrah26@gmail.com</v-btn>
              <div class="text-body-2">Available for freelance.</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-container v-else class="d-flex" style="height: 100vh">
      <v-btn @click="loginHandler()" class="my-auto mx-auto">Login to Spotify</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function () {
    return {
      company: "",
      card: {
        reveal: false,
      },
    };
  },
  computed: {
    isLoggedIn() {
      if (localStorage.getItem("access_token")) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    loginHandler() {
      window.location = `https://accounts.spotify.com/authorize?response_type=token&redirect_uri=https%3A%2F%2Fmfitrahrmd420.github.io%2Fvue-spotify%2Fauth&scope=user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20user-read-recently-played%20user-follow-modify%20user-read-playback-position%20user-follow-read&client_id=7f7858ab81324701ada54b47514fa0a6`;
    },
  },
};
</script>

<style scoped>
/* var */
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  bottom: 0;
  right: 0;
}

/* var */
#home {
  position: relative;
}
.bg-img {
  height: 100vh;
  position: fixed;
}
.bg-img::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: inset 0px 0px 300px 150px #222222;
}
.socmed-container {
  display: flex;
  gap: 1.5rem;
}
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
