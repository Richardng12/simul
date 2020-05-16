import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { bindActionCreators } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import style from '../styles/appBar.module.css';
import { getUserInfo } from '../../../store/profile/profileActions';
import MusicNoteI from '../../../general/MusicNoteI';

const SimulAppBar = props => {
  const { user, title, userInfo } = props;
  const history = useHistory();
  useEffect(() => {
    userInfo();
  }, []);

  return (
    <div className={style.barContainer}>
      <div className={style.bar}>
        <IconButton
          className={style.logoButton}
          onClick={() => {
            history.goBack();
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
});

// <div>
//   <AppBar position="static" className={styles.root}>
//     <Toolbar className={styles.toolBar}>
//       <Typography
//         variant="h6"
//         onClick={() => {
//           history.goBack();
//         }}
//       >
//         SIMUL
//       </Typography>
//       <p className={styles.barTitle}>{title}</p>
//       <Typography variant="h6">{username}</Typography>
//     </Toolbar>
//   </AppBar>
// </div>

export default connect(mapStateToProps, mapDispatchToProps)(SimulAppBar);
