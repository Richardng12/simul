import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import { getSongInfo, pausePlayback, startPlayback } from './musicPlayerService';
import style from './musicPlayer.module.css';
import Progress from './Progress';

const MusicPlayer = props => {
  const { accessToken } = props;
  const startingTime = 0;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongId, setCurrentSongId] = useState('');
  const [currentTime, setCurrentTime] = useState(startingTime);

  // const [songTime, setSongTime] = useState(0);

  // const songs = lobby.songs.map(song => `spotify:track:${song.spotifyId}`);

  // todo: replace with call to API

  const currentSongs = [
    'spotify:track:24zYR2ozYbnhhwulk2NLD4',
    'spotify:track:2O9KgUsmuon6Gycdmagc6t',
  ];

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    const player = new window.Spotify.Player({
      name: 'Spotify Web Player', // the script is loaded in
      getOAuthToken: cb => {
        cb(accessToken);
      },
    });

    player.addListener('player_state_changed', state => {
      console.log('playerState changed');
      console.log(state);
      setCurrentTime(0);
      setCurrentSong(state.track_window.current_track);
    });
    // eslint-disable-next-line camelcase
    player.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id);
    });

    player.connect();

    setWebPlayer(player);
  };

  useEffect(async () => {
    setCurrentSongId(currentSongs.shift().substring(14));
    console.log(scriptLoaded);
    console.log(webPlayer);
    window.onSpotifyWebPlaybackSDKReady = () => {
      handleScriptLoad();
    };
  }, []);
  const onLoad = () => {
    setScriptLoaded(true);
  };

  const onError = () => {
    // todo
    console.log('Error');
  };

  // todo: the song will auto play but for now do an onclick
  const handleStartClick = () => {
    console.log('here first');
    getSongInfo(accessToken, currentSongId).then(res => {
      setCurrentSong(res);
      // setSongTime(res.duration_ms);
    });
    startPlayback(accessToken, deviceId, currentSongs, startingTime);
  };

  return (
    <div className={style.parentPlayer}>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onError={() => onError()}
        onLoad={() => onLoad()}
      />
      <div className={style.player}>
        <Progress
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          songTime={currentSong ? currentSong.duration_ms : 0}
        />
      </div>
      <button type="button" onClick={() => handleStartClick()}>
        start
      </button>
      <button type="button" onClick={() => pausePlayback(accessToken, deviceId)}>
        stop
      </button>
      <div>
        <p>{currentSong ? currentSong.artists[0].name : ''}</p>
        <p>{currentSong ? currentSong.name : ''}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
});

export default connect(mapStateToProps)(MusicPlayer);
