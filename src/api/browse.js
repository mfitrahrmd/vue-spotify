import axiosInstance from "@/api";

export async function getNewReleases() {
  return await axiosInstance({
    url: "/browse/new-releases",
    method: "GET",
  });
}

export async function getFeaturedPlaylists() {
  return await axiosInstance({
    url: "/browse/featured-playlists",
    method: "GET",
  });
}
