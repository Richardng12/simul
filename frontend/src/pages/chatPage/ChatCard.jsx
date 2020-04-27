import React from 'react';
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

function ChatCard(props) {
  return (
    <div style={{ width: '100%' }}>
      <Comment
        // eslint-disable-next-line react/destructuring-assignment
        author={props.sender.displayName}
        // eslint-disable-next-line react/destructuring-assignment
        avatar={<Avatar src={props.sender.thumbnail} alt={props.sender.displayName} />}
        // eslint-disable-next-line react/destructuring-assignment
        content={
          // eslint-disable-next-line react/destructuring-assignment
          props.message.substring(0, 7) === 'public\\' ? (
            <img
              style={{ maxWidth: '200px' }}
              // eslint-disable-next-line react/destructuring-assignment
              src={`http://localhost:8888/${props.message}`}
              alt="img"
            />
          ) : (
            // eslint-disable-next-line react/destructuring-assignment
            <p>{props.message}</p>
          )
        }
        datetime={
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}

export default ChatCard;
