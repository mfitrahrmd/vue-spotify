export function mapPlaylistTracksId(v) {
  return v
    .map((m) => {
      return m.track.id;
    })
    .join(",");
}

export function mapPlaylistLikedTracks(v, w) {
  return v.map((m, i) => {
    m.track.is_liked = w[i];
    return m;
  });
}
