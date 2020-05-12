import React from 'react';
import SongSearch from './components/songSearch';
import SongQueueTable from './components/songQueueTable';
import styles from './styles/queueContainer.module.css';

const QueueContainer = () => {
  return (
    <div className={styles.root}>
      <SongSearch />
      <SongQueueTable />
    </div>
  );
};

export default QueueContainer;
