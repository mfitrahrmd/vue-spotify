<template>
  <div>
    <v-img src="@/assets/img/gaming_setup.jpg" class="bg-img"></v-img>
    <v-container v-if="isLoggedIn" id="home" class="whitesmoke--text pt-16" fluid>
      <v-container class="d-flex">
        <v-avatar>
          <v-img src="@/assets/logo.png"></v-img>
        </v-avatar>
        <div class="socmed-container ms-auto">
          <a href="https://github.com/mfitrahrmd420/vue-spotify/" target="_"><v-icon class="white--text">mdi mdi-github</v-icon></a>
        </div>
      </v-container>
      <v-container class="main-content">
        <v-row>
          <v-col cols="8" order="1" class="mt-16">
            <div class="">
              <div class="text-h3 mb-6">Manage your saved <span>Playlists|</span></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
    isLoggedIn() {
      return this.getAccessToken ? true : false;
    },
  },
  methods: {},
  created() {},
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
