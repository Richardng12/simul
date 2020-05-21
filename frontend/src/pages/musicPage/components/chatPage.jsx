/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import ChatCard from './ChatCard';
import HOST from '../../../config/config';
import style from '../styles/ChatPage.module.css';
import { getChats, afterPostMessage } from '../../../store/chat/chatActions';

// connect
const server = HOST;
const socket = io(server);

const ChatPage = props => {
  // user obj,
  const { user, chats, allChats, message, lobbyId } = props;

  // message the user types
  const [chatMessage, setChatMessage] = useState('');

  // Deals with automatic scroll of chat with overflowing text
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [allChats]);

  useEffect(() => {
    // get all chats for a lobby
    chats(lobbyId);

    // when backend receives a message, it sends it back up to frontend,
    // and we append that new message to the state.
    //  (so the state has all messages now)
    socket.on('Output Chat Message', messageFromBackEnd => {
      message(messageFromBackEnd);
    });
    return () => {
      socket.off();
    };
  }, []);

  const handleSearchChange = e => {
    setChatMessage(e.target.value);
  };

  // map all chats in lobby and render it
  const renderCards = () => allChats && allChats.map(chat => <ChatCard key={chat._id} {...chat} />);

  // send this data to backend
  const submitChatMessage = e => {
    e.preventDefault();

    const userId = user._id;

    const userName = user.username;

    const { thumbnail } = user;

    const nowTime = moment();
    const type = 'Text';

    socket.emit('Input Chat Message', {
      chatMessage,
      userId,
      lobbyId,
      userName,
      thumbnail,
      nowTime,
      type,
    });
    setChatMessage('');
  };

  return (
    <div className={style.pageContainer}>
      <div className={style.chatContainer}>
        {renderCards()}
        {/* {chats && {}} */}
        <div ref={messagesEndRef} />
      </div>

      <Row>
        <Form layout="inline" onSubmit={submitChatMessage} className={style.chatInput}>
          <Col span={21}>
            <Input
              id="message"
              placeholder="Let's start talking"
              type="text"
              style={{ backgroundColor: '#3A3A3A', borderColor: '#3A3A3A' }}
              value={chatMessage}
              onChange={handleSearchChange}
            />
          </Col>
          <Col span={3}>
            <Button
              type="primary"
              style={{ width: '100%', backgroundColor: '#f6a333', borderColor: '#f6a333' }}
              onClick={submitChatMessage}
              htmlType="submit"
            >
              <EnterOutlined />
            </Button>
          </Col>
        </Form>
      </Row>
    </div>
  );
};

// chats -> get all chats into state
// message -> append that message and concat with all msgs currently in database
const mapDispatchToProps = dispatch => ({
  chats: lobbyId => {
    dispatch(getChats(lobbyId));
  },
  // chats: bindActionCreators(getChats, dispatch),
  message: messageFromBackEnd => {
    dispatch(afterPostMessage(messageFromBackEnd));
  },
});

// user -> get user object, allChats -> get all chats from database
const mapStateToProps = state => {
  return {
    user: state.profileReducer.user,
    allChats: state.chatReducer.chats,
    lobbyId: state.lobbyReducer.lobbyId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
