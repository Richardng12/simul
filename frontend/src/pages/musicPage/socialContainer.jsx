import React from 'react';
import styles from './styles/socialContainer.module.css';
import MembersList from './components/membersList';
import ChatPage from './components/chatPage';
import text from '../../general/text';

const SocialContainer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.chatHeader}>
        <p className={styles.chatHeaderText}>{text.musicPage.social.chatHeader}</p>
      </div>
      <div className={styles.userHeader}>
        <p className={styles.userHeaderText}>{text.musicPage.social.userHeader}</p>
      </div>
      <ChatPage />
      <MembersList />
    </div>
  );
};

export default SocialContainer;
