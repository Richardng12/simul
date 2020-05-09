import React, { useState } from 'react';
import { useHistory } from 'react-router';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EnterPasswordModal from './enterPasswordModal';
import style from './LobbyTile.module.css';

const LobbyTile = props => {
  const { name, id, isPublic, password } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const changeHistory = path => {
    if (isPublic) {
      history.push(path);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={style.lobbyTile} onClick={() => changeHistory(`/lobby/${id}`)}>
      {name}
      {!isPublic && <LockOutlinedIcon />}
      <EnterPasswordModal
        open={open}
        onClose={handleClose}
        name={name}
        password={password}
        lobbyId={id}
      />
    </div>
  );
};

export default LobbyTile;
