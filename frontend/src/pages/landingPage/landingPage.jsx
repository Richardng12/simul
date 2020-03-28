import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import styles from '../../styles/landingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.content}>
      <Typography variant="h1">SIMUL</Typography>
      <Link to="/music" style={{ textDecoration: 'none' }}>
        <Button size="large" color="primary" className={styles.button}>
          Login to Spotify
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
