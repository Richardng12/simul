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
import { setDevice, updateCurrentSong, setSeenTracks } from '../../../../store/music/musicActions';
import {
  getTimeStampDifferential,
  removeSongFromQueue,
  setSongTimeStamp,
} from '../../../../store/lobby/lobbyActions';

const MusicPlayer = props => {
  const {
    accessToken,
    addDeviceId,
    currentSong,
    updateSong,
    currentQueue,
    setTimeStamp,
    songStartTimeStamp,
    deviceId,
    seenTracks,
    updateTrackNumber,
    removeSong,
  } = props;
  const startingTime = 0;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [webPlayer, setWebPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(startingTime);
  const [volume, setVolume] = useState(90);
  const [startProgress, setStartProgress] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams();
  const currentSongs = currentQueue.map(song => `spotify:track:${song.spotifySongId}`);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    const player = new window.Spotify.Player({
      name: 'Spotify Web Player', // the script is loaded in
      getOAuthToken: cb => {
        cb(accessToken);
      },
    });

    // set up initial state
    player.addListener('player_state_changed', state => {
      const previousTracks = state.track_window.previous_tracks;
      if (seenTracks < previousTracks.length) {
        setCurrentTime(state.position);
        // Remove the previous track from the list
        if (currentQueue.length > 0) {
          removeSong(currentQueue[0]._id);
        }

        updateTrackNumber(previousTracks.length);
        updateSong(state.track_window.current_track);
      }
    });

    // eslint-disable-next-line camelcase
    player.addListener('ready', ({ device_id }) => {
      addDeviceId(device_id);
    });

    player.connect();
    setWebPlayer(player);
  };

  useEffect(() => {
    if (currentQueue.length === 0 && seenTracks > 0) {
      pausePlayback(accessToken, deviceId);
      setIsPlaying(false);
      updateSong({ error: 'no songs' });
      setSeenTracks(0);
    }
    if (currentSongs.length === 1) {
      const x = currentSongs.shift().substring(14);
      getSongInfo(accessToken, x).then(res => {
        updateSong(res);
      });
    }

    if (webPlayer) {
      webPlayer.removeListener('player_state_changed');

      webPlayer.addListener('player_state_changed', state => {
        const previousTracks = state.track_window.previous_tracks;
        if (seenTracks < previousTracks.length) {
          setCurrentTime(state.position);
          // Remove the previous track from the list
          if (currentQueue.length > 0) {
            removeSong(currentQueue[0]._id);
          }

          updateTrackNumber(previousTracks.length);
          updateSong(state.track_window.current_track);
        }
      });
    }
  }, [currentQueue]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      handleScriptLoad();
    };

    let initialSong;
    if (currentSongs.length > 0) {
      initialSong = currentSongs.shift().substring(14);
    }

    getSongInfo(accessToken, initialSong).then(res => {
      updateSong(res);
    });
  }, []);
  const onLoad = () => {
    handleScriptLoad();
  };

  useEffect(() => {
    if (currentSongs.length > 0 && deviceId !== null) {
      const timeStampToStartPlayingFrom = Math.floor(
        new Date(JSON.parse(JSON.stringify(new Date()))) - new Date(songStartTimeStamp),
      );
      if (songStartTimeStamp === null) {
        setIsPlaying(true);
        setCurrentTime(0);
        startPlayback(accessToken, deviceId, currentSongs, 0);
        setStartProgress(true);
        setTimeStamp();
      } else {
        if (!isPlaying) {
          startPlayback(accessToken, deviceId, currentSongs, timeStampToStartPlayingFrom);

          setIsPlaying(true);
          setStartProgress(true);
          setCurrentTime(timeStampToStartPlayingFrom);
        }
        setStartProgress(true);
      }
    }
  }, [deviceId, currentSong]);

  useEffect(() => {
    // socket.on('sendMessageToPlay', () => {
    //   console.log('shit');
    // });
    socket.on('sendMessageToPlay', () => {
      let initialSong;
      getSongInfo(accessToken, initialSong).then(res => {
        updateSong(res);
      });
      startPlayback(accessToken, deviceId, currentSongs, 0);
      setStartProgress(true);
    });
  }, [deviceId]);

  const onError = () => {
    // eslint-disable-next-line no-console
    console.log('Error');
  };

  const handleStartClick = () => {
    if (currentSongs.length === 0) {
      // eslint-disable-next-line no-console
      console.log('no songs in queue');
    } else {
      setStartProgress(true);
      socket.emit('playMusic', id);
    }
  };

  const handleVolumeChange = (event, newValue) => {
    if (webPlayer) {
      webPlayer.setVolume(newValue / 100);
      setVolume(newValue);
    }
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
          <div className={style.leftSide} />
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
              <IconButton
                className={style.volumeButton}
                onClick={event => handleVolumeChange(event, 0)}
              >
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
  songStartTimeStamp: state.lobbyReducer.currentLobby.songStartTimeStamp,
  seenTracks: state.musicReducer.currentTracks,
});

const mapDispatchToProps = dispatch => ({
  addDeviceId: deviceId => dispatch(setDevice(deviceId)),
  updateSong: song => dispatch(updateCurrentSong(song)),
  setTimeStamp: bindActionCreators(setSongTimeStamp, dispatch),
  updateTrackNumber: seenTracks => dispatch(setSeenTracks(seenTracks)),
  removeSong: bindActionCreators(removeSongFromQueue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
