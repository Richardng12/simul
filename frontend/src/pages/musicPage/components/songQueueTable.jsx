import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from '../../../styles/songQueueTable.module.css';

function createData(title, artist, album) {
  return { title, artist, album };
}

const rows = [
  createData('Versace on the Floor', 'Bruno Mars', '24K Magic'),
  createData('Marry you', 'Bruno Mars', 'Doo-Wops & Hooligans'),
  createData(
    'Girls Like You (feat. Cardi B)',
    'Maroon 5, Cardi B',
    'Girls Like You (feat. Cardi B)',
  ),
  createData('It Girl', 'Jason Derulo', 'Future History'),
  createData('Miss Independent', 'Ne-Yo', 'Year of the Gentlemen'),
  createData('Versace on the Floor', 'Bruno Mars', '24K Magic'),
  createData('Marry you', 'Bruno Mars', 'Doo-Wops & Hooligans'),
  createData(
    'Girls Like You (feat. Cardi B)',
    'Maroon 5, Cardi B',
    'Girls Like You (feat. Cardi B)',
  ),
  createData('It Girl', 'Jason Derulo', 'Future History'),
  createData('Miss Independent', 'Ne-Yo', 'Year of the Gentlemen'),
  createData('Versace on the Floor', 'Bruno Mars', '24K Magic'),
  createData('Marry you', 'Bruno Mars', 'Doo-Wops & Hooligans'),
  createData(
    'Girls Like You (feat. Cardi B)',
    'Maroon 5, Cardi B',
    'Girls Like You (feat. Cardi B)',
  ),
  createData('It Girl', 'Jason Derulo', 'Future History'),
  createData('Miss Independent', 'Ne-Yo', 'Year of the Gentlemen'),
  createData('Versace on the Floor', 'Bruno Mars', '24K Magic'),
  createData('Marry you', 'Bruno Mars', 'Doo-Wops & Hooligans'),
  createData(
    'Girls Like You (feat. Cardi B)',
    'Maroon 5, Cardi B',
    'Girls Like You (feat. Cardi B)',
  ),
  createData('It Girl', 'Jason Derulo', 'Future History'),
  createData('Miss Independent', 'Ne-Yo', 'Year of the Gentlemen'),
];

function SongQueueTable() {
  return (
    <TableContainer component={Paper}>
      <Table className={styles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell align="right">ARTIST</TableCell>
            <TableCell align="right">ALBUM</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.artist}</TableCell>
              <TableCell align="right">{row.album}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SongQueueTable;
