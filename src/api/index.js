import axios from "axios";
import store from "@/store";

const API = axios.create({
  baseURL: "https://api.spotify.com/v1",
  withCredentials: true,
});

API.interceptors.request.use(function (config) {
  config.headers.common["Authorization"] = `Bearer ${store.getters["auth/getAccessToken"]}`;
  return config;
});

export default {
  getUserProfile() {
    return API({
      url: "/me",
      method: "GET",
    });
  },
};
