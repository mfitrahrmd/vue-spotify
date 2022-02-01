const chunk = function (arr) {
  let result = [];

  while (arr.length) {
    result.push(arr.splice(0, 50));
  }
  return result;
};

export function mapPlaylistTracksId(v) {
  const arr = v.map((m) => {
    return m.track.id;
  });

  if (arr.length <= 50) {
    return arr.join(",");
  } else {
    return chunk(arr).map((m) => {
      return m.join(",");
    });
  }
}

export function mapPlaylistLikedTracks(v, w) {
  return v.map((m, i) => {
    m.track.is_liked = w[i];
    return m;
  });
}
