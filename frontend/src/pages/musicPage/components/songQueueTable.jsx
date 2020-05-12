import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { connect } from 'react-redux';
import styles from '../styles/songQueueTable.module.css';

function createData(title, artist) {
  return { title, artist };
}

// const rows = [
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('Versace on the Floor', 'Bruno Mars'),
//   createData('Marry you', 'Bruno Mars'),
//   createData('Girls Like You (feat. Cardi B)', 'Maroon 5, Cardi B'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('Versace on the Floor', 'Bruno Mars'),
//   createData('Marry you', 'Bruno Mars'),
//   createData('Girls Like You (feat. Cardi B)', 'Maroon 5, Cardi B'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('Versace on the Floor', 'Bruno Mars'),
//   createData('Marry you', 'Bruno Mars'),
//   createData('Girls Like You (feat. Cardi B)', 'Maroon 5, Cardi B'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
//   createData('Versace on the Floor', 'Bruno Mars'),
//   createData('Marry you', 'Bruno Mars'),
//   createData('Girls Like You (feat. Cardi B)', 'Maroon 5, Cardi B'),
//   createData('It Girl', 'Jason Derulo'),
//   createData('Miss Independent', 'Ne-Yo'),
// ];

const SongQueueTable = props => {
  const { lobby } = props;
  const { songs } = lobby;
  const rows = songs.map(song => createData(song.title, song.artist));
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table stickyHeader aria-label="simple table">
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell align="left">ARTIST</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={styles.tableBody}>
          {rows.map(row => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">{row.artist}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const mapStateToProps = state => ({
  lobby: state.lobbyReducer.currentLobby,
});

export default connect(mapStateToProps)(SongQueueTable);
