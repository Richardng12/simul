import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EnterPasswordModal from './enterPasswordModal';
import ConfirmDeleteLobbyModal from './confirmDeleteLobbyModal';
import style from './LobbyTile.module.css';

const LobbyTile = props => {
  const { name, id, isPublic, password, createdBy, userId } = props;
  const history = useHistory();
  const [open, setModal] = useState(false);
  const [deleteLobbyOpen, setDeleteLobbyOpen] = useState(false);

  const changeHistory = path => {
    if (isPublic) {
      history.push(path);
    } else {
      setModal(true);
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  const handleCloseDeleteLobby = () => {
    setDeleteLobbyOpen(false);
  };

  return (
    <div className={style.lobbyContainer}>
      <EnterPasswordModal
        open={open}
        onClose={handleClose}
        name={name}
        password={password}
        lobbyId={id}
      />
      <ConfirmDeleteLobbyModal
        open={deleteLobbyOpen}
        onClose={handleCloseDeleteLobby}
        lobbyName={name}
        lobbyId={id}
      />
      {createdBy === userId && (
        <ClearIcon
          className={style.deleteIcon}
          onClick={() => {
            setDeleteLobbyOpen(true);
          }}
        />
      )}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={style.lobbyTile} onClick={() => changeHistory(`/lobby/${id}`)}>
        <div className={style.background}>
          {!isPublic && (
            <LockOutlinedIcon preserveAspectRatio="none" className={style.lockedIcon} />
          )}
        </div>
        <div className={style.bottomSection}>
          <p className={style.lobbyName}>{name}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.profileReducer.user._id,
});

export default connect(mapStateToProps)(LobbyTile);
