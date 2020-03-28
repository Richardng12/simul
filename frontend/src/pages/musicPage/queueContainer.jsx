import React from 'react';
import SongSearch from './components/songSearch';
import SongQueueTable from './components/songQueueTable';
import MusicPlayer from './components/musicPlayer';
import styles from './styles/queueContainer.module.css';

const QueueContainer = () => {
  return (
    <div className={styles.root}>
      <SongSearch />
      <SongQueueTable />
      <MusicPlayer />
    </div>
  );
};

export default QueueContainer;
