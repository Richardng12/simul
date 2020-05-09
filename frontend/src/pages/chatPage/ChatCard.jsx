import React from 'react';
import { Comment, Avatar } from 'antd';

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

          // eslint-disable-next-line react/destructuring-assignment
          <p>{props.message}</p>
        }
      />
    </div>
  );
}

export default ChatCard;
