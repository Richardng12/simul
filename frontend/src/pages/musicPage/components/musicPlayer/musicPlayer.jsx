/* eslint no-unused-vars: 0 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import { VolumeDown, VolumeOff, VolumeUp } from '@material-ui/icons';
import socket from '../../../../socket';
import { changeVolume, getSongInfo, pausePlayback, startPlayback } from './musicPlayerService';
import style from './musicPlayer.module.css';
import Progress from './Progress';
import { setDevice, updateCurrentSong } from '../../../../store/music/musicActions';
import { getTimeStampDifferential, setSongTimeStamp } from '../../../../store/lobby/lobbyActions';

const MusicPlayer = props => {
  const {
    accessToken,
    lobby,
    addDeviceId,
    currentSong,
    updateSong,
    currentQueue,
    currentTimeStamp,
    setTimeStamp,
    getTimeStampDifference,
    songStartTimeStamp,
    deviceId,
  } = props;
  const startingTime = 40000;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  // const [deviceId, setDeviceId] = useState(null);
  // const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(startingTime);
  const [volume, setVolume] = useState(90);
  const [startProgress, setStartProgress] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [timeStampDifferential, setTimeStampDifferential] = useState(null);
  const { id } = useParams();
  const currentSongs = currentQueue.map(song => `spotify:track:${song.spotifySongId}`);
  // const currentSongs = lobby.songs.map(song => `spotify:track:${song.spotifySongId}`);

  // todo: replace with call to API

  // const currentSongs = [
  //   'spotify:track:24zYR2ozYbnhhwulk2NLD4',
  //   'spotify:track:2O9KgUsmuon6Gycdmagc6t',
  // ];

  const setTimeDiff = () => {
    const timeStampToStartPlayingFrom = Math.floor(
      new Date(JSON.parse(JSON.stringify(new Date()))) - new Date(songStartTimeStamp),
    );
    setTimeStampDifferential(timeStampToStartPlayingFrom);

    console.log(JSON.parse(JSON.stringify(new Date())));
    console.log(songStartTimeStamp);
    console.log(timeStampToStartPlayingFrom);
  };

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
      // setDeviceId(device_id);
      console.log(device_id);
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
      // setTimeDiff();
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

  useEffect(() => {
    socket.on('sendMessageToPlay', () => {
      console.log(`music playing for ${socket.id}`);
      let initialSong;
      if (currentSongs.length > 0) {
        initialSong = currentSongs.shift().substring(14);
        // setTimeDiff();
      }
      getSongInfo(accessToken, initialSong).then(res => {
        updateSong(res);
      });
      console.log(deviceId);
      startPlayback(accessToken, deviceId, currentSongs, timeStampDifferential);
    });
    return () => {
      socket.off();
    };
  }, [deviceId]);

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
      setStartProgress(true);
      //  startPlayback(accessToken, deviceId, currentSongs, 0);
      socket.emit('playMusic', id);
      // setTimeStamp();
      // if timestampdifferential > 0 you dont want to set the timestamp.

      // set current time stamp when playing
      // api call one
      console.log('call');
    }
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    changeVolume(accessToken, volume);
  };

  const handleVolumeIcon = () => {
    if (volume <= 0) {
      return <VolumeOff />;
    }
    if (volume > 0 && volume < 40) {
      return <VolumeDown />;
    }
    return <VolumeUp />;
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
              startProgress={startProgress}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              songTime={currentSong ? currentSong.duration_ms : 0}
            />
          </div>
          <div className={style.rightSide}>
            <div
              className={style.volumeContainer}
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
            >
              <IconButton className={style.volumeButton} onClick={() => setVolume(0)}>
                {handleVolumeIcon()}
              </IconButton>
              {showVolume ? (
                <Slider
                  className={style.slider}
                  orientation="vertical"
                  value={volume}
                  disabled={!currentSong}
                  onChange={handleVolumeChange}
                  aria-labelledby="vertical-slider"
                />
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
  deviceId: state.musicReducer.currentDevice,
  currentSong: state.musicReducer.currentSong,
  currentQueue: state.lobbyReducer.currentQueue,
  // timeStampDifferential: state.lobbyReducer.timeStampDifferential,
  // songStartTimeStamp: state.lobbyReducer.currentLobby.songStartTimeStamp,
});

const mapDispatchToProps = dispatch => ({
  addDeviceId: deviceId => dispatch(setDevice(deviceId)),
  updateSong: song => dispatch(updateCurrentSong(song)),
  // setTimeStamp: bindActionCreators(setSongTimeStamp, dispatch),
  // getTimeStampDifference: () => dispatch(getTimeStampDifferential()),
  // getTimeStampDifference: bindActionCreators(getTimeStampDifferential, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
