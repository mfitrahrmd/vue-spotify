<template>
  <div>
    <Flicking :options="options" :plugins="plugins">
      <slot></slot>
      <span slot="viewport" class="flicking-arrow-prev"></span>
      <span slot="viewport" class="flicking-arrow-next"></span>
    </Flicking>
  </div>
</template>

<script>
import { Flicking } from "@egjs/vue-flicking";
import "@egjs/vue-flicking/dist/flicking.css";
import "@egjs/vue-flicking/dist/flicking-inline.css";
import "@egjs/flicking-plugins/dist/arrow.css";
export default {
  data() {
    return {};
  },
  props: {
    options: {
      type: Object,
    },
    plugins: {
      type: Array,
    },
  },
  components: {
    Flicking,
  },
};
</script>
