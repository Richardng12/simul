import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles/landingPage.module.css';
import { login } from '../../store/profile/profileActions';

const LandingPage = () => {
  // const { loginSpotify } = props;
  // console.log(loginSpotify);
  return (
    <div className={styles.content}>
      <Typography variant="h1">SIMUL</Typography>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <Button size="large" color="primary" className={styles.button}>
          {/* <Button size="large" color="primary" className={styles.button} onClick={() => loginSpotify()}> */}
          Login to Spotify
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.profileReducer.loading,
});

const mapDispatchToProps = dispatch => ({
  loginSpotify: bindActionCreators(login, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
