import React from 'react';
import SongSearch from './components/songSearch';
import SongQueueTable from './components/songQueueTable';

function QueueContainer() {
  return (
    <div>
      <SongSearch />
      <SongQueueTable />
    </div>
  );
}

export default QueueContainer;
