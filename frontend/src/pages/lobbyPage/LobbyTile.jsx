import React from 'react';
import { useHistory } from 'react-router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EnterPasswordModal from './enterPasswordModal';
import style from './LobbyTile.module.css';

const LobbyTile = props => {
  const { name, id, isPublic } = props;
  const history = useHistory();

  // eslint-disable-next-line consistent-return
  const changeHistory = path => {
    if (isPublic) {
      history.push(path);
    } else {
      return <EnterPasswordModal />;
    }
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={style.lobbyTile} onClick={() => changeHistory(`/lobby/${id}`)}>
      {name}
      {!isPublic && <LockOutlinedIcon />}
    </div>
  );
};

export default LobbyTile;
