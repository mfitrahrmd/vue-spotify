import axiosInstance from "@/api";

export async function getUserFollowedArtists() {
  return await axiosInstance({
    url: "/me/following",
    method: "GET",
    params: {
      limit: 50,
      type: "artist",
    },
  });
}
