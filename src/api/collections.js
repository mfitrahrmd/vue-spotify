import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/spotify",
  withCredentials: true,
});

export default {
  getCollections() {
    return apiClient({
      url: "/collections",
      method: "GET",
    });
  },
};
