import { mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", {
      getAccessToken: "getAccessToken",
    }),
    isLoggedIn() {
      return this.getAccessToken ? true : false;
    },
  },
  methods: {
    ...mapMutations("auth", {
      SET_TOKEN: "SET_TOKEN",
    }),
    login() {
      window.location = `https://accounts.spotify.com/authorize?response_type=token&redirect_uri=http%3A%2F%2Flocalhost:8080&scope=user-read-private%20user-library-read%20user-library-modify%20playlist-read-private%20user-read-recently-played%20user-follow-modify%20user-read-playback-position%20user-follow-read&client_id=7f7858ab81324701ada54b47514fa0a6`;
    },
    logout() {
      localStorage.clear();
      window.location = "/";
    },
    authHandler() {
      console.log("hai");
      this.isLoggedIn ? this.logout() : this.login();
    },
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
      this.$router.push("/");
    }
  },
};
