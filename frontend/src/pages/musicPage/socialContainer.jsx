import React from 'react';
import styles from './styles/socialContainer.module.css';
import MembersList from './components/membersList';
import ChatPage from './components/chatPage';

const SocialContainer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.chatHeader}>Chat</div>
      <div className={styles.userHeader}>Users</div>
      <ChatPage />
      <MembersList />
    </div>
  );
};

export default SocialContainer;
