import React from 'react';
import { Comment, Avatar } from 'antd';

function ChatCard(props) {
  return (
    <div style={{ width: '100%' }}>
      <Comment
        // eslint-disable-next-line react/destructuring-assignment
        author={<p style={{ color: '#b47725', fontWeight: 'bold' }}>{props.sender.displayName}</p>}
        // eslint-disable-next-line react/destructuring-assignment
        avatar={<Avatar src={props.sender.thumbnail} alt={props.sender.displayName} />}
        // eslint-disable-next-line react/destructuring-assignment
        content={
          // eslint-disable-next-line react/destructuring-assignment

          // eslint-disable-next-line react/destructuring-assignment
          <p style={{ color: 'white' }}>{props.message}</p>
        }
      />
    </div>
  );
}

export default ChatCard;
