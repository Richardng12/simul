import React from 'react';
import AppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';

import styles from './styles/musicPage.module.css';

const MusicPage = () => {
  return (
    <div className={styles.root}>
      <AppBar />
      <div className={styles.mostStuff}>
        <div className={styles.playerStuff}>
          <QueueContainer />
        </div>
        <div className={styles.nonPlayerStuff}>
          <LyricsContainer />
          <SocialContainer />
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
