import axiosInstance from "@/api";
import axios from "axios";

export async function getTrack(trackId) {
  return await axiosInstance({
    url: "/tracks/" + trackId,
    method: "GET",
  });
}

export function getUserSavedTracks() {
  return axiosInstance({
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

export function checkUserSavedTracks(trackId) {
  if (Array.isArray(trackId)) {
    return axios.all(
      trackId.map((m) => {
        return axiosInstance({
          url: "/me/tracks/contains",
          method: "GET",
          params: {
            ids: m,
          },
        });
      })
    );
  } else {
    return axiosInstance({
      url: "/me/tracks/contains",
      method: "GET",
      params: {
        ids: trackId,
      },
    });
  }
}

export async function getTrackAudioFeatures(trackId) {
  return await axiosInstance({
    url: "/audio-features/" + trackId,
    method: "GET",
  });
}
