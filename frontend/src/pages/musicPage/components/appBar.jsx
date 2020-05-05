import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { bindActionCreators } from 'redux';
import styles from '../styles/appBar.module.css';
import { getUserInfo } from '../../../store/profile/profileActions';

const SimulAppBar = props => {
  const { username, title, userInfo } = props;
  useEffect(() => {
    userInfo();
  }, []);
  return (
    <div>
      <AppBar position="static" className={styles.root}>
        <Toolbar className={styles.toolBar}>
          <Typography variant="h6">SIMUL</Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h6">{username}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    username: state.profileReducer.username,
  };
};

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulAppBar);
