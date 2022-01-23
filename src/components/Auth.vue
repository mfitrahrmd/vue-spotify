<template>
  <div></div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations("auth", {
      SET_TOKEN: "SET_TOKEN",
    }),
    ...mapActions("users", {
      fetchUserProfile: "fetchUserProfile",
    }),
  },
  created() {
    if (window.location.hash) {
      const data = window.location.hash
        .substring(1)
        .split("&")
        .reduce((acc, curr) => {
          return {
            ...acc,
            [curr.split("=")[0]]: curr.split("=")[1],
          };
        }, {});
      this.SET_TOKEN(data);
      localStorage.setItem("access_token", data.access_token);
      this.fetchUserProfile();
    }
    this.$router.push("/");
  },
};
</script>
