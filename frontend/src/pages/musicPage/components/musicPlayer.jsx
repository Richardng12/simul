import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import { pausePlayback, skipToOneMin, startPlayback } from './musicPlayerService';

const MusicPlayer = props => {
  const { accessToken } = props;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  // const songs = lobby.songs.map(song => `spotify:track:${song.spotifyId}`);
  console.log(scriptLoaded);
  console.log(webPlayer);
  const currentSongs = ['spotify:track:2hnxrRNzF74mdDzpQZQukQ'];

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
    console.log('goes here');
    console.log(accessToken);
    window.onSpotifyWebPlaybackSDKReady = () => {
      handleScriptLoad();
    };
  }, []);

  return (
    <div>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onCreate={() => console.log('yes')}
        onError={() => console.log('no')}
        onLoad={() => test()}
      />
      <button type="button" onClick={() => startPlayback(accessToken, deviceId, currentSongs)}>
        start
      </button>
      <button type="button" onClick={() => pausePlayback(accessToken, deviceId)}>
        stop
      </button>
      <button type="button" onClick={() => skipToOneMin(accessToken, deviceId)}>
        skip to one min
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
});

export default connect(mapStateToProps)(MusicPlayer);
