import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import Slider from '@material-ui/core/Slider';
import classNames from 'classnames';
import { changeVolume, getSongInfo, pausePlayback, startPlayback } from './musicPlayerService';
import style from './musicPlayer.module.css';
import Progress from './Progress';

const MusicPlayer = props => {
  const { accessToken, lobby } = props;
  const startingTime = 40000;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongId, setCurrentSongId] = useState('');
  const [currentTime, setCurrentTime] = useState(startingTime);
  const [volume, setVolume] = useState(10);
  // const [songTime, setSongTime] = useState(0);

  const currentSongs = lobby.songs.map(song => `spotify:track:${song.spotifySongId}`);

  // todo: replace with call to API

  // const currentSongs = [
  //   'spotify:track:24zYR2ozYbnhhwulk2NLD4',
  //   'spotify:track:2O9KgUsmuon6Gycdmagc6t',
  // ];

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    const player = new window.Spotify.Player({
      name: 'Spotify Web Player', // the script is loaded in
      getOAuthToken: cb => {
        cb(accessToken);
      },
    });

    player.addListener('player_state_changed', state => {
      setCurrentTime(state.position);
      setCurrentSong(state.track_window.current_track);
    });
    // eslint-disable-next-line camelcase
    player.addListener('ready', ({ device_id }) => {
      setDeviceId(device_id);
    });

    player.connect();
    setWebPlayer(player);
  };

  useEffect(() => {
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
    getSongInfo(accessToken, currentSongId).then(res => {
      setCurrentSong(res);
      // setSongTime(res.duration_ms);
    });
    startPlayback(accessToken, deviceId, currentSongs, startingTime);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    changeVolume(accessToken, volume);
  };

  return (
    <div className={style.parentPlayer}>
      <Script
        url="https://sdk.scdn.co/spotify-player.js"
        onError={() => onError()}
        onLoad={() => onLoad()}
      />
      {deviceId == null ? (
        <div>Loading...</div>
      ) : (
        <div className={style.player}>
          <div className={style.leftSide}>
            {currentSong ? (
              <img src={currentSong.album.images[0].url} alt="thumbnail" height="71px" />
            ) : (
              <p>image goes here</p>
            )}
          </div>
          <div className={style.mainContent}>
            <p className={classNames(style.playerText, style.songText)}>
              {currentSong ? currentSong.name : '---'}
            </p>
            <p className={classNames(style.playerText, style.authorText)}>
              {currentSong ? currentSong.artists[0].name : '---'}
            </p>
            <Progress
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              songTime={currentSong ? currentSong.duration_ms : 0}
            />
          </div>
          <div className={style.rightSide}>
            <Slider
              value={volume}
              disabled={!currentSong}
              onChange={handleVolumeChange}
              aria-labelledby="continuous-slider"
            />

            {/* TODO: remove these buttons */}
            <button type="button" onClick={() => handleStartClick()}>
              start
            </button>
            <button type="button" onClick={() => pausePlayback(accessToken, deviceId)}>
              stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
});

export default connect(mapStateToProps)(MusicPlayer);
