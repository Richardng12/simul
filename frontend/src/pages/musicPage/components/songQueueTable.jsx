import React from 'react';
import { bindActionCreators } from 'redux';
import Table from '@material-ui/core/Table';
import ClearIcon from '@material-ui/icons/Clear';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { removeSongFromQueue } from '../../../store/lobby/lobbyActions';
import styles from '../styles/songQueueTable.module.css';

function createData(id, title, artist, addedBy) {
  return { id, title, artist, addedBy };
}

const SongQueueTable = props => {
  const { lobby, removeSong, userId } = props;
  const { songs } = lobby;
  const rows = songs.map(song => createData(song._id, song.title, song.artist, song.addedBy));

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table stickyHeader aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell align="left">ARTIST</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {rows.map(row => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.artist}</TableCell>
              <TableCell align="right">
                {row.addedBy === userId && (
                  <ClearIcon
                    onClick={() => {
                      removeSong(row.id);
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
  userId: state.profileReducer.userId,
});

const mapDispatchToProps = dispatch => ({
  removeSong: bindActionCreators(removeSongFromQueue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongQueueTable);
