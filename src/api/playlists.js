import axiosInstance from "@/api";

export async function getUserPlaylists() {
  return await axiosInstance({
    url: "/me/playlists",
    method: "GET",
    params: {
      limit: 50,
    },
  });
}

export async function getPlaylist(playlistId) {
  return await axiosInstance({
    url: "/playlists/" + playlistId,
    method: "GET",
  });
}

export async function getPlaylistTracks(playlistId) {
  return await axiosInstance({
    url: "/playlists/" + playlistId + "/tracks",
    method: "GET",
  });
}

export async function createPlaylist(userId, data) {
  return await axiosInstance({
    url: "/users/" + userId + "/playlists",
    method: "POST",
    data,
  });
}

export async function removeTrackFromPlaylist(playlistId, data) {
  return await axiosInstance({
    url: "/playlists/" + playlistId + "/tracks",
    method: "DELETE",
    data,
  });
}
