import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/spotify",
  withCredentials: true,
});

export default {
  async getExplore() {
    return await apiClient({
      url: "/explore",
      method: "GET",
    });
  },
};
