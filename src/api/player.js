import axiosInstance from "@/api";

export async function getUserRecentlyPlayedTracks() {
  return await axiosInstance({
    url: "/me/player/recently-played",
    method: "GET",
  });
}
