import API from "./index";
export default {
  getUserProfile() {
    return API({
      url: "/me",
      method: "GET",
    });
  },
};
