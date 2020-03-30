import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from '../styles/membersList.module.css';

function createData(name) {
  return { name };
}

const rows = [
  createData('Allen Nian'),
  createData('Richard Ng'),
  createData('Brian Nguyen'),
  createData('Edward Zhang'),
  createData('Allen Nian'),
  createData('Richard Ng'),
  createData('Brian Nguyen'),
  createData('Edward Zhang'),
];

const SongQueueTable = () => {
  return (
    <TableContainer component={Paper} className={styles.root}>
      <Table stickyHeader aria-label="simple table">
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <AccountCircleIcon />
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongQueueTable;
