import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimulAppBar from '../musicPage/components/appBar';
import { getUserInfo } from '../../store/profile/profileActions';
import { getAllLobbies } from '../../store/lobby/lobbyActions';
import style from './lobbyPage.module.css';

const LobbyPage = props => {
  const { userInfo, getLobbies, lobbies, profileLoader, lobbyLoader } = props;

  useEffect(() => {
    userInfo();
    getLobbies();
  }, []);

  return profileLoader || lobbyLoader ? (
    <div>Loading</div>
  ) : (
    <div className={style.lobbyParent}>
      <SimulAppBar />
      <div className={style.lobbyContainer}>
        {lobbies.length === 0 ? (
          <p>No Lobbies :(</p>
        ) : (
          lobbies.map(lobby => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={lobby._id} className={style.lobbyCard}>
              {lobby.name}
            </div>
          ))
        )}
      </div>
      <p>This is the lobbies Page</p>
    </div>
  );
};

const mapStateToProps = state => ({
  profileLoader: state.profileReducer.loading,
  lobbyLoader: state.lobbyReducer.loading,
  lobbies: state.lobbyReducer.lobbies,
});

const mapDispatchToProps = dispatch => ({
  userInfo: bindActionCreators(getUserInfo, dispatch),
  getLobbies: bindActionCreators(getAllLobbies, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
