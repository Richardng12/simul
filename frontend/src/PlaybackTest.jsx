import React, { useEffect, useState } from 'react';
import Script from 'react-load-script';

const PlaybackTest = ({ accessToken }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const handleScriptLoad = () => {
    setScriptLoaded(true);
    const player = new window.Spotify.Player({
      name: 'Spotify Web Player', // the script is loaded in
      getOAuthToken: cb => {
        cb(accessToken);
      },
    });

    // eslint-disable-next-line camelcase
    player.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id);
    });

    player.connect();

    setWebPlayer(player);
  };
  const test = () => {
    setScriptLoaded(true);
  };

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      handleScriptLoad();
    };
  }, []);

  const startPlayback = () => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({
        uris: ['spotify:track:2hnxrRNzF74mdDzpQZQukQ'],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(res => {
      console.log(res);
    });
  };

  const pausePlayback = () => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(res => {
      console.log(res);
    });
  };

  const skipToOneMin = () => {
    fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=10000&device_id${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(res => {
      console.log(res);
    });
  };

  // TODO: only allow the above functions to be made when the webplayer and script has been loaded.
  console.log(webPlayer);
  console.log(scriptLoaded);

  return (
    <div>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onCreate={() => console.log('yes')}
        onError={() => console.log('no')}
        onLoad={() => test()}
      />
      <p>hello</p>
      <button type="button" onClick={() => startPlayback()}>
        start
      </button>
      <button type="button" onClick={() => pausePlayback()}>
        stop
      </button>
      <button type="button" onClick={() => skipToOneMin()}>
        skip to one min
      </button>
    </div>
  );
};

export default PlaybackTest;
