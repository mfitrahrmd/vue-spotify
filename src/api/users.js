import axiosInstance from "@/api";

export async function getUserProfile() {
  return await axiosInstance({
    url: "/me",
    method: "GET",
  });
}
