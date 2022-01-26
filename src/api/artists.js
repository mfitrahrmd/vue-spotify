import axiosInstance from "@/api";

export function getArtist(artistId) {
  return axiosInstance({
    url: "/artists/" + artistId,
    method: "GET",
  });
}

export function checkUserFollowsArtist(artistId) {
  return axiosInstance({
    url: "/me/following/contains",
    method: "GET",
    params: {
      type: "artist",
      ids: artistId,
    },
  });
}

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

export function getArtistTopTracks(artistId) {
  return axiosInstance({
    url: "/artists/" + artistId + "/top-tracks",
    method: "GET",
    params: {
      market: "ES",
    },
  });
}

export function followArtist(artistId) {
  return axiosInstance({
    url: "/me/following",
    method: "PUT",
    params: {
      type: "artist",
      ids: artistId,
    },
  });
}

export function unfollowArtist(artistId) {
  return axiosInstance({
    url: "/me/following",
    method: "DELETE",
    params: {
      type: "artist",
      ids: artistId,
    },
  });
}
