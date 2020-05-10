import React from 'react';
import styles from './styles/socialContainer.module.css';
// import Chat from './components/chat';
import MembersList from './components/membersList';
import ChatPage from '../chatPage/chatPage';

const SocialContainer = () => {
  return (
    <div className={styles.root}>
      <ChatPage />
      <MembersList />
    </div>
  );
};

export default SocialContainer;
