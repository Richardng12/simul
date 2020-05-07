import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SimulAppBar from '../musicPage/components/appBar';
import { getUserInfo } from '../../store/profile/profileActions';
import { addLobby, getAllLobbies } from '../../store/lobby/lobbyActions';
import style from './lobbyPage.module.css';
import LobbyTile from './LobbyTile';

const LobbyPage = props => {
  const { getLobbies, lobbies, lobbyLoader, createLobby } = props;

  useEffect(() => {
    getLobbies();
  }, []);

  // lobbies.push({ users: '210345sasvb', _id: '1234567', name: 'testing' });
  // lobbies.push({ users: '210345sasvb', _id: 'asdf', name: 'oneoenoen' });
  // lobbies.push({ users: '210345sasvb', _id: 'aaaaaa', name: 'ROCK SONG' });
  // lobbies.push({ users: '210345sasvb', _id: '3333333', name: 'bbebebe' });
  console.log(lobbies[0] != null ? lobbies : 'null');
  return lobbyLoader ? (
    <div>Loading</div>
  ) : (
    <div className={style.lobbyParent}>
      <SimulAppBar title="LOBBY" />
      <div>
        <Button onClick={() => createLobby()}>Add</Button>
      </div>
      <div className={style.lobbyContainer}>
        {lobbies.length === 0 ? (
          <p>No Lobbies :(</p>
        ) : (
          lobbies.map(lobby => (
            // eslint-disable-next-line no-underscore-dangle
            <LobbyTile name={lobby.name} id={lobby._id} key={lobby._id} />
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
  createLobby: bindActionCreators(addLobby, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyPage);
