import React from 'react';
import styles from './styles/socialContainer.module.css';
import AppBar from './components/appBar';

const SocialContainer = () => {
  return (
    <div className={styles.root}>
      <AppBar />
    </div>
  );
};

export default SocialContainer;
