import React from 'react';
import { useParams } from 'react-router';
import AppBar from './components/appBar';
import LyricsContainer from './lyricsContainer';
import QueueContainer from './queueContainer';
import SocialContainer from './socialContainer';

import styles from './styles/musicPage.module.css';

const MusicPage = () => {
  const { id } = useParams();
  return (
    <div className={styles.root}>
      <AppBar title={id} />
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
