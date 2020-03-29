import React from 'react';
import styles from './styles/socialContainer.module.css';
import Chat from './components/chat';
import MembersList from './components/membersList';

const SocialContainer = () => {
  return (
    <div className={styles.root}>
      <Chat />
      <MembersList />
    </div>
  );
};

export default SocialContainer;
