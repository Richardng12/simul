import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useParams } from 'react-router';
import SimulAppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';

import styles from './styles/musicPage.module.css';
import { getSingleLobby, setCurrentLobbyId, setUsersInLobby } from '../../store/lobby/lobbyActions';
import MusicPlayerContainer from './components/musicPlayer/musicPlayerContainer';

// const getLobbyInfo = (id, lobbies) => {
//   // eslint-disable-next-line no-underscore-dangle
//   return lobbies.find(lobby => lobby._id === id);
// };

const MusicPage = props => {
  const { getLobby, lobby, loading, setId, setUsers } = props;
  // const lobbyInfo = getLobbyInfo(lobbyId, lobbies);

  const { id } = useParams();
  useEffect(() => {
    setId(id);
    getLobby();
    setUsers(id);
  }, []);
  return loading || !lobby ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.root}>
      <SimulAppBar title={lobby.name} />
      <div className={styles.mostStuff}>
        <div className={styles.playerStuff}>
          <QueueContainer songs={lobby.songs} />
        </div>
        <div className={styles.nonPlayerStuff}>
          <LyricsContainer />
          <SocialContainer />
        </div>
      </div>
      <MusicPlayerContainer />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicPage);
