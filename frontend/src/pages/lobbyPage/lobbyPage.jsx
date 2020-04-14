import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimulAppBar from '../musicPage/components/appBar';
import { getUserInfo } from '../../store/profile/profileActions';
import { getAllLobbies } from '../../store/lobby/lobbyActions';
import style from './lobbyPage.module.css';
import LobbyTile from './LobbyTile';

const LobbyPage = props => {
  const { userInfo, getLobbies, lobbies, profileLoader, lobbyLoader } = props;

  useEffect(() => {
    userInfo();
    getLobbies();
  }, []);

  lobbies.push({ users: '210345sasvb', _id: '1234567', name: 'testing' });
  lobbies.push({ users: '210345sasvb', _id: 'asdf', name: 'oneoenoen' });
  lobbies.push({ users: '210345sasvb', _id: 'aaaaaa', name: 'ROCK SONG' });
  lobbies.push({ users: '210345sasvb', _id: '3333333', name: 'bbebebe' });

  return profileLoader || lobbyLoader ? (
    <div>Loading</div>
  ) : (
    <div className={style.lobbyParent}>
      <SimulAppBar title="LOBBY" />
      <div className={style.lobbyContainer}>
        {lobbies.length === 0 ? (
          <p>No Lobbies :(</p>
        ) : (
          lobbies.map(lobby => (
            // eslint-disable-next-line no-underscore-dangle
            <LobbyTile name={lobby.name} key={lobby._id} />
          ))
        )}
      </div>
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
