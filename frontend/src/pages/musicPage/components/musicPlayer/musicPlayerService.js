const API_ENDPOINT = 'https://api.spotify.com/v1/me/player';
const skipTo = async (accessToken, deviceId, time) => {
  await fetch(`${API_ENDPOINT}/seek?position_ms=${time}&device_id${deviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const startSong = async (accessToken, deviceId, currentSongs) => {
  const x = await fetch(`${API_ENDPOINT}/play?device_id=${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify({
      uris: currentSongs,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return x;
};

const changeVolume = (accessToken, volumePercent) => {
  fetch(`${API_ENDPOINT}/volume?volume_percent=${volumePercent}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r);
};
const startPlayback = (accessToken, deviceId, currentSongs, currentTime) => {
  startSong(accessToken, deviceId, currentSongs).then(() => {
    setTimeout(() => {
      skipTo(accessToken, deviceId, currentTime);
      changeVolume(accessToken, 10);
    }, 200); // sometimes the skipping occurs before the player
  });
};

const pausePlayback = (accessToken, deviceId) => {
  fetch(`${API_ENDPOINT}/pause?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(r => r);
};

// todo: probably should store this as a state with redux...
const getSongInfo = async (accessToken, trackId) => {
  const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.json();
};

export { startPlayback, pausePlayback, skipTo, getSongInfo, changeVolume };
