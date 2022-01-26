import axiosInstance from "@/api";

export async function getAlbum(albumId) {
  return await axiosInstance({
    url: "/albums/" + albumId,
    method: "GET",
  });
}
