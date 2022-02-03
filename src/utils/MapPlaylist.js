// Split array into multiple array with length 50
const chunk = function (arr) {
  let result = [];

  while (arr.length) {
    result.push(arr.splice(0, 50));
  }
  return result;
};

// --- Export --- //

export function mapPlaylistTracksId(v) {
  const arr = v.map((m) => {
    return m.track.id;
  });

  return chunk(arr).map((m) => {
    return m.join(",");
  });
}

export function mapPlaylistLikedTracks(v, w) {
  return v.map((m, i) => {
    m.track.is_liked = w[i];
    return m;
  });
}
