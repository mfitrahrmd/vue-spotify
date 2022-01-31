<template>
  <div>
    <div id="not-found">
      <h1>{{ errorStatus }}</h1>
      <router-link to="/">back to homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "not-found",
  data() {
    return {};
  },
  computed: {
    errorStatus() {
      return "Page Not Found";
    },
  },
};
</script>

<style scoped>
#not-found {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
