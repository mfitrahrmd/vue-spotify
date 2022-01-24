import axiosInstance from "@/api";

export async function getUserSavedTracks() {
  return await axiosInstance({
    url: "/me/tracks",
    method: "GET",
    params: {
      limit: 50,
    },
  });
}

export async function addUserSavedTracks(trackId) {
  return await axiosInstance({
    url: "/me/tracks",
    method: "PUT",
    params: {
      ids: trackId,
    },
  });
}

export async function removeUserSavedTracks(trackId) {
  return await axiosInstance({
    url: "/me/tracks",
    method: "DELETE",
    params: {
      ids: trackId,
    },
  });
}

export async function checkUserSavedTracks(trackId) {
  return await axiosInstance({
    url: "/me/tracks/contains",
    method: "GET",
    params: {
      ids: trackId,
    },
  });
}
