import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import style from '../styles/appBar.module.css';
import { getUserInfo } from '../../../store/profile/profileActions';
import { removeUserFromLobby } from '../../../store/lobby/lobbyActions';
import MusicNoteI from '../../../general/MusicNoteI';

const SimulAppBar = props => {
  const { user, title, userInfo, className, removeUser } = props;
  const history = useHistory();
  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div className={classNames(style.barContainer, className)}>
      <div className={style.bar}>
        <IconButton
          className={style.logoButton}
          onClick={() => {
            history.goBack();
            removeUser(user._id);
          }}
        >
          <MusicNoteI />
        </IconButton>
        <p className={style.barTitle}>{title}</p>
        <div className={style.user}>
          <p className={style.userName}>{user.displayName}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.profileReducer.user,
  };
};

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
  removeUser: userId => dispatch(removeUserFromLobby(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimulAppBar);
