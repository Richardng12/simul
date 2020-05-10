import React from 'react';
import SongSearch from './components/songSearch';
import SongQueueTable from './components/songQueueTable';
import styles from './styles/queueContainer.module.css';
import MusicPlayerContainer from './components/musicPlayerContainer';

const QueueContainer = () => {
  return (
    <div className={styles.root}>
      <SongSearch />
      <SongQueueTable />
      <MusicPlayerContainer />
    </div>
  );
};

export default QueueContainer;
