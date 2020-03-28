import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/appBar.module.css';

export default function ButtonAppBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={styles.toolBar}>
          <Typography variant="h6">SIMUL</Typography>
          <Typography variant="h6">LOBBY</Typography>
          <Typography variant="h6">Allen Nian</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
