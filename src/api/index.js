import axios from "axios";
import store from "@/store";

const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
  // headers: {
  //   Authorization: `Bearer ${localStorage.access_token}`,
  // },
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers.common["Authorization"] = `Bearer ${store.state.auth.token.access_token}`;
  return config;
});

export default axiosInstance;
