const API_ENDPOINT = 'https://api.spotify.com/v1/me/player';
const startPlayback = (accessToken, deviceId, currentSongs) => {
  fetch(`${API_ENDPOINT}/play?device_id=${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify({
      uris: currentSongs,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => {
    console.log(res);
  });
};

const pausePlayback = (accessToken, deviceId) => {
  fetch(`${API_ENDPOINT}/pause?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => {
    console.log(res);
  });
};

const skipToOneMin = (accessToken, deviceId) => {
  fetch(`${API_ENDPOINT}/seek?position_ms=10000&device_id${deviceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(res => {
    console.log(res);
  });
};

export { startPlayback, pausePlayback, skipToOneMin };
