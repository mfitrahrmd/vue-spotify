<template>
  <div class="d-flex flex-column">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="align-self-end mx-10" v-bind="attrs" v-on="on"> Create New Playlist </v-btn>
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

    <div class="mx-5" style="position: relative">
      <swiper ref="mySwiper" :options="{ ...swiperOptions, slidesPerView: $vuetify.breakpoint.mdAndDown ? 2 : 5, slidesPerGroup: $vuetify.breakpoint.mdAndDown ? 2 : 5 }">
        <swiper-slide v-for="(item, i) in getUserPlaylists.items" :key="i">
          <router-link :to="'/playlists/' + item.id">
            <v-card>
              <v-img :aspect-ratio="1 / 1" :src="item.images.length ? item.images[0].url : 'https://dummyimage.com/300x300&text=No%20image'"></v-img>
              <div class="text-truncate pa-5 mx-auto" style="width: 90%">
                <v-caard-title class="title text-truncate">
                  {{ item.name }}
                </v-caard-title>
                <v-card-subtitle class="text-truncate pa-0 ma-0">
                  {{ item.description }}
                </v-card-subtitle>
              </div>
            </v-card>
          </router-link>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
      <v-btn @click="swipe('prev')" fab small absolute style="top: 50%; left: 0; transform: translate(-50%, -50%); z-index: 100"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn @click="swipe('next')" fab small absolute style="top: 50%; right: 0; transform: translate(50%, -50%); z-index: 100"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

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
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters({
      getUserPlaylists: "playlists/getUserPlaylists",
      getUserProfile: "users/getUserProfile",
    }),
    swiper() {
      return this.$refs.mySwiper.$swiper;
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
        this.fetchCreatePlaylist({ userId: this.getUserProfile.id, data: { name: this.form.playlistName } });
      }
    },
    swipe(direction) {
      console.log(this.swiper);
      if (direction == "prev") {
        this.swiper.slidePrev(500, false);
      } else if (direction == "next") {
        this.swiper.slideNext(500, false);
      } else {
        return;
      }
    },
  },
  created() {
    this.fetchUserPlaylists();
  },
};
</script>
