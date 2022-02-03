<template>
  <div class="d-flex flex-column">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="align-self-end mx-5" v-bind="attrs" v-on="on"> Create New Playlist </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Playlist Name</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="valid">
                  <v-text-field v-model="form.playlistName" :rules="[(v) => !!v || 'Name is required']" required></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"> Cancel </v-btn>
          <v-btn type="submit" color="blue darken-1" text @click="dialogSubmit" :disabled="!valid"> Create </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <Swiper :items="getUserPlaylists.items" :options="{ ...swiperOptions, spaceBetween: isMobile ? 10 : 25, slidesPerView: isMobile ? 2 : 5, slidesPerGroup: isMobile ? 2 : 5 }">
        <template v-slot="{ item }">
          <v-menu tile bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click.prevent style="z-index: 100" absolute icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list dense tile>
              <v-list-item>
                <a :href="item.external_urls.spotify" target="blank">Open in Spotify</a>
              </v-list-item>
            </v-list>
          </v-menu>
          <router-link :to="'/playlists/' + item.id">
            <v-card>
              <v-img :aspect-ratio="1 / 1" :src="item.images.length ? item.images[0].url : 'https://dummyimage.com/300x300&text=No%20image'"></v-img>
              <div class="text-truncate mx-auto" style="width: 90%">
                <v-card-text class="pa-0 ma-0">
                  <div class="text-truncate title my-3">
                    {{ item.name }}
                  </div>
                  <div class="text-truncate" v-html="item.description"></div>
                </v-card-text>
              </div>
            </v-card>
          </router-link>
        </template>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swiper from "./Swiper.vue";

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      form: {
        playlistName: "",
      },
      listItems: [{ title: "Open in Spotify", click: (item) => window.open(item.external_urls.spotify) }],
      swiperOptions: {
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true,
        },
        spaceBetween: 10,
      },
    };
  },
  components: { Swiper },
  computed: {
    ...mapGetters({
      getUserPlaylists: "playlists/getUserPlaylists",
      getUserProfile: "users/getUserProfile",
    }),
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown ? true : false;
    },
  },
  methods: {
    ...mapActions({
      fetchUserPlaylists: "playlists/fetchUserPlaylists",
      fetchCreatePlaylist: "playlists/fetchCreatePlaylist",
      fetchDeletePlaylist: "playlists/fetchDeletePlaylist",
    }),
    dialogSubmit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.fetchCreatePlaylist({ userId: this.getUserProfile.id, data: { name: this.form.playlistName } }).then((v) => {
          alert(v.data);
          this.fetchUserPlaylists();
        });
      }
      this.dialog = false;
    },
  },
  created() {
    this.fetchUserPlaylists();
  },
};
</script>
