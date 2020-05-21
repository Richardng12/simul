/* eslint no-unused-vars: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import Slider from '@material-ui/core/Slider';
import { changeVolume, getSongInfo, pausePlayback, startPlayback } from './musicPlayerService';
import style from './musicPlayer.module.css';
import Progress from './Progress';
import { setDevice, updateCurrentSong } from '../../../../store/music/musicActions';

const MusicPlayer = props => {
  const { accessToken, lobby, addDeviceId, currentSong, updateSong } = props;
  const startingTime = 40000;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  // const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(startingTime);
  const [volume, setVolume] = useState(90);
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
      updateCurrentSong(state.track_window.current_track);
    });
    // eslint-disable-next-line camelcase
    player.addListener('ready', ({ device_id }) => {
      addDeviceId(device_id);
      setDeviceId(device_id);
    });

    player.connect();
    setWebPlayer(player);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(scriptLoaded);
    // eslint-disable-next-line no-console
    console.log(webPlayer);
    window.onSpotifyWebPlaybackSDKReady = () => {
      handleScriptLoad();
    };

    let initialSong;
    if (currentSongs.length > 0) {
      initialSong = currentSongs.shift().substring(14);
    }

    // TODO: move this outside of the music player
    getSongInfo(accessToken, initialSong).then(res => {
      // setCurrentSong(res);
      updateSong(res);
    });
  }, []);
  const onLoad = () => {
    handleScriptLoad();
  };

  const onError = () => {
    // todo
    // eslint-disable-next-line no-console
    console.log('Error');
  };

  // todo: the song will auto play but for now do an onclick
  const handleStartClick = () => {
    if (currentSongs.length === 0) {
      // eslint-disable-next-line no-console
      console.log('no songs in queue');
    } else {
      startPlayback(accessToken, deviceId, currentSongs, startingTime);
    }
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
            {/* TODO: remove these buttons */}
            <button type="button" onClick={() => handleStartClick()}>
              start
            </button>
            <button type="button" onClick={() => pausePlayback(accessToken, deviceId)}>
              stop
            </button>
          </div>
          <div className={style.mainContent}>
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
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
  deviceId: state.musicReducer.deviceId,
  currentSong: state.musicReducer.currentSong,
});

const mapDispatchToProps = dispatch => ({
  addDeviceId: deviceId => dispatch(setDevice(deviceId)),
  updateSong: song => dispatch(updateCurrentSong(song)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
