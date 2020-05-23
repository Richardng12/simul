/* eslint no-unused-vars: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router';
import io from 'socket.io-client';
import HOST from '../../config/config';
import SimulAppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';
import socket from '../../socket';
import styles from './styles/musicPage.module.css';
import {
  getSingleLobby,
  setCurrentLobbyId,
  setUsersInLobby,
  setLobbyQueue,
  setSongTimeStamp,
} from '../../store/lobby/lobbyActions';
import MusicPlayerContainer from './components/musicPlayer/musicPlayerContainer';
import Loader from '../../general/Loader';

// const getLobbyInfo = (id, lobbies) => {
//   // eslint-disable-next-line no-underscore-dangle
//   return lobbies.find(lobby => lobby._id === id);
// };

const MusicPage = props => {
  const {
    getLobby,
    lobby,
    loading,
    setId,
    setUsers,
    setQueue,
    currentSong,
    //  setCurrentSongTimeStamp,
  } = props;
  // const lobbyInfo = getLobbyInfo(lobbyId, lobbies);

  const { id } = useParams();

  useEffect(() => {
    // get all chats for a lobby
    socket.emit('onLobbyJoin', id);

    socket.on('joinMessage', data => {
      console.log(data);
      console.log('hi');
    });
    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    setId(id);
    getLobby();
    setUsers(id);
    setQueue(id);
  }, []);
  return loading || !lobby ? (
    <Loader />
  ) : (
    <div className={styles.root}>
      <SimulAppBar title={lobby.name} className={styles.header} />
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          <div className={styles.imageContainer}>
            {currentSong ? (
              <img src={currentSong.album.images[0].url} alt="thumbnail" className={styles.image} />
            ) : (
              <div className={styles.empty} />
            )}
          </div>
          {currentSong ? (
            <p className={styles.songText}>{currentSong.name}</p>
          ) : (
            <p className={styles.songText}>----</p>
          )}
          {currentSong ? (
            <p className={styles.artistText}>{currentSong.artists[0].name}</p>
          ) : (
            <p className={styles.artistText}>----</p>
          )}
          <div className={styles.lyricContainer}>
            <LyricsContainer className={styles.outerLyrics} />
          </div>
        </div>
        <div className={styles.rightSide}>
          <QueueContainer songs={lobby.songs} />
          <SocialContainer />
        </div>
      </div>
      <div className={styles.playerContainer}>
        <MusicPlayerContainer />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  lobbyId: state.lobbyReducer.lobbyId,
  lobby: state.lobbyReducer.currentLobby,
  loading: state.lobbyReducer.loading,
  lobbies: state.lobbyReducer.lobbies,
  currentSong: state.musicReducer.currentSong,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setCurrentLobbyId(id)),
  getLobby: bindActionCreators(getSingleLobby, dispatch),
  setUsers: bindActionCreators(setUsersInLobby, dispatch),
  setQueue: bindActionCreators(setLobbyQueue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);
