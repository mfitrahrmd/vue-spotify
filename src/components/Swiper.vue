<template>
  <div class="mx-5" style="position: relative">
    <swiper ref="mySwiper" :options="options">
      <swiper-slide v-for="(item, i) in items" :key="i">
        <slot :item="item"></slot>
      </swiper-slide>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
    </swiper>
    <v-btn @click="swipe('prev')" fab small absolute style="top: 50%; left: 0; transform: translate(-50%, -50%); z-index: 100"><v-icon>mdi-chevron-left</v-icon></v-btn>
    <v-btn @click="swipe('next')" fab small absolute style="top: 50%; right: 0; transform: translate(50%, -50%); z-index: 100"><v-icon>mdi-chevron-right</v-icon></v-btn>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    items: {
      type: [Array, Object],
      required: true,
    },
    options: {
      type: Object,
    },
  },
  methods: {
    swipe(direction) {
      if (direction == "prev") {
        this.$refs.mySwiper.$swiper.slidePrev(500, false);
      } else if (direction == "next") {
        this.$refs.mySwiper.$swiper.slideNext(500, false);
      } else {
        return;
      }
    },
  },
};
</script>
