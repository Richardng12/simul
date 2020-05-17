import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EnterPasswordModal from './enterPasswordModal';
import { deleteLobby } from '../../store/lobby/lobbyActions';
import style from './LobbyTile.module.css';

const LobbyTile = props => {
  const { name, id, isPublic, password, createdBy, userId, deleteLobbyFromDB } = props;
  const history = useHistory();
  const [open, setModal] = useState(false);

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

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={style.lobbyTile} onClick={() => changeHistory(`/lobby/${id}`)}>
      {createdBy === userId && (
        <ClearIcon
          onClick={() => {
            deleteLobbyFromDB(id);
          }}
        />
      )}
      <EnterPasswordModal
        open={open}
        onClose={handleClose}
        name={name}
        password={password}
        lobbyId={id}
      />
      <div className={style.background}>{!isPublic && <LockOutlinedIcon />}</div>
      <div className={style.bottomSection}>
        <p className={style.lobbyName}>{name}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.profileReducer.user._id,
});

const mapDispatchToProps = dispatch => ({
  deleteLobbyFromDB: bindActionCreators(deleteLobby, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyTile);
