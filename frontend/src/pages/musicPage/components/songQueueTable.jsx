/* eslint no-unused-vars: 0 */
import React from 'react';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import ClearIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { removeSongFromQueue } from '../../../store/lobby/lobbyActions';
import styles from '../styles/songQueueTable.module.css';

function createData(id, title, artist, addedBy) {
  return { id, title, artist, addedBy };
}

const SongQueueTable = props => {
  const { removeSong, userId, currentQueue } = props;

  const rows = currentQueue.map(song =>
    createData(song._id, song.title, song.artist, song.addedBy),
  );

  return (
    <div className={styles.table}>
      <div className={classNames(styles.row, styles.topRow)}>
        <p className={styles.titleHeader}>TITLE</p>
        <p className={styles.artistHeader}>ARTIST</p>
      </div>
      {rows.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={styles.row} key={`row_${index}`}>
          <p className={classNames(styles.rowTitle, index === 0 ? styles.highlight : '')}>
            {row.title}
          </p>
          <p className={classNames(styles.rowArtist, index === 0 ? styles.highlight : '')}>
            {row.artist}
          </p>
          <div>
            {row.addedBy === userId && (
              <ClearIcon
                className={styles.clearIcon}
                onClick={() => {
                  removeSong(row.id);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
  userId: state.profileReducer.user._id,
  currentQueue: state.lobbyReducer.currentQueue,
});

const mapDispatchToProps = dispatch => ({
  removeSong: bindActionCreators(removeSongFromQueue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongQueueTable);
