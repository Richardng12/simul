import React from 'react';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import AppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';

import styles from './styles/musicPage.module.css';

const getLobbyInfo = (id, lobbies) => {
  // eslint-disable-next-line no-underscore-dangle
  return lobbies.find(lobby => lobby._id === id);
};

const MusicPage = props => {
  const { lobbies } = props;
  const { id } = useParams();
  const lobbyInfo = getLobbyInfo(id, lobbies);
  console.log(lobbyInfo);
  return (
    <div className={styles.root}>
      <AppBar title={lobbyInfo.name} />
      <div className={styles.mostStuff}>
        <div className={styles.playerStuff}>
          <QueueContainer songs={lobbyInfo != null ? lobbyInfo.songs : []} />
        </div>
        <div className={styles.nonPlayerStuff}>
          <LyricsContainer />
          <SocialContainer />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  lobbies: state.lobbyReducer.lobbies,
});

export default connect(mapStateToProps)(MusicPage);
