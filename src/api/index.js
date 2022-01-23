import axios from "axios";

// Uncomment below if you want to store access_token in memory instead of localStorage
// import store from "@/store";
// API.interceptors.request.use(function (config) {
//   config.headers.common["Authorization"] = `Bearer ${store.getters["auth/getAccessToken"]}`;
//   return config;
// });

const API = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${localStorage.access_token}`,
  },
  withCredentials: true,
});

export default API;
