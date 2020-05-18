/* eslint no-unused-vars: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router';
import SimulAppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';

import styles from './styles/musicPage.module.css';
import {
  getSingleLobby,
  setCurrentLobbyId,
  setUsersInLobby,
  setLobbyQueue,
} from '../../store/lobby/lobbyActions';
import MusicPlayerContainer from './components/musicPlayer/musicPlayerContainer';

// const getLobbyInfo = (id, lobbies) => {
//   // eslint-disable-next-line no-underscore-dangle
//   return lobbies.find(lobby => lobby._id === id);
// };

const MusicPage = props => {
  const { getLobby, lobby, loading, setId, setUsers, setQueue } = props;
  // const lobbyInfo = getLobbyInfo(lobbyId, lobbies);

  const { id } = useParams();
  useEffect(() => {
    setId(id);
    getLobby();
    setUsers(id);
    setQueue(id);
  }, []);
  return loading || !lobby ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.root}>
      <SimulAppBar title={lobby.name} />
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          {/*  */}
          <div>Image goes here</div>
          {/* <div>Image goes here</div> */}
          <LyricsContainer />
        </div>
        <div className={styles.rightSide}>
          {/* <QueueContainer songs={lobby.songs} /> */}
          {/* <SocialContainer /> */}
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
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setCurrentLobbyId(id)),
  getLobby: bindActionCreators(getSingleLobby, dispatch),
  setUsers: bindActionCreators(setUsersInLobby, dispatch),
  setQueue: bindActionCreators(setLobbyQueue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);
