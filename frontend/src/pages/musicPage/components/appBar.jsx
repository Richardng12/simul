import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import styles from '../styles/appBar.module.css';

const SimulAppBar = props => {
  const { username } = props;

  return (
    <div>
      <AppBar position="static" className={styles.root}>
        <Toolbar className={styles.toolBar}>
          <Typography variant="h6">SIMUL</Typography>
          <Typography variant="h6">LOBBY</Typography>
          <Typography variant="h6">{username}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    username: state.profileReducer.user.displayName,
  };
};

export default connect(mapStateToProps)(SimulAppBar);
