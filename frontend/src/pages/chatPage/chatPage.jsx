/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { EnterOutlined, MessageOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import moment from 'moment';

export class ChatPage extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    chatMessage: '',
  };

  componentDidMount() {
    const server = 'http://localhost:8888';

    this.socket = io(server);

    this.socket.on('Output Chat Message', messageFromBackEnd => {
      console.log(messageFromBackEnd);
    });
  }

  handleSearchChange = e => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  submitChatMessage = e => {
    e.preventDefault();

    // eslint-disable-next-line prefer-destructuring
    // eslint-disable-next-line react/destructuring-assignment
    const { chatMessage } = this.state;
    // eslint-disable-next-line no-underscore-dangle
    // eslint-disable-next-line react/destructuring-assignment
    const userId = this.props._id;
    // eslint-disable-next-line react/destructuring-assignment
    const userName = this.props.username;
    // eslint-disable-next-line react/destructuring-assignment

    const nowTime = moment();
    const type = 'Image';

    this.socket.emit('Input Chat Message', {
      chatMessage,
      userId,
      userName,
      nowTime,
      type,
    });
    this.setState({ chatMessage: '' });
  };

  render() {
    return (
      // eslint-disable-next-line react/jsx-fragments
      <React.Fragment>
        <div>
          <p style={{ fontSize: '2rem', textAlign: 'center' }}> Real Time Chat</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="infinite-container">
            {/* {this.props.chats && (
                            <div>{this.renderCards()}</div>
                        )} */}
            <div
              ref={el => {
                this.messagesEnd = el;
              }}
              style={{ float: 'left', clear: 'both' }}
            />
          </div>

          <Row>
            <Form layout="inline" onSubmit={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  prefix={<MessageOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Let's start talking"
                  type="text"
                  // eslint-disable-next-line react/destructuring-assignment
                  value={this.state.chatMessage}
                  onChange={this.handleSearchChange}
                />
              </Col>
              <Col span={2} />

              <Col span={4}>
                <Button
                  type="primary"
                  style={{ width: '100%' }}
                  onClick={this.submitChatMessage}
                  htmlType="submit"
                >
                  <EnterOutlined />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.profileReducer.user,
  };
};

export default connect(mapStateToProps)(ChatPage);
