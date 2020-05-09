import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SimulAppBar from '../musicPage/components/appBar';
import AddLobbyModal from './addLobbyModal';
import { getUserInfo } from '../../store/profile/profileActions';
import { getAllLobbies } from '../../store/lobby/lobbyActions';
import style from './lobbyPage.module.css';
import LobbyTile from './LobbyTile';

const LobbyPage = props => {
  const { getLobbies, lobbies, lobbyLoader } = props;
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getLobbies();
  }, []);

  const filterLobbies = event => {
    setFilter(event.target.value);
  };

  const displayModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return lobbyLoader ? (
    <div>Loading</div>
  ) : (
    <div className={style.lobbyParent}>
      <SimulAppBar title="LOBBY" />
      <AddLobbyModal open={showModal} onClose={closeModal} />
      <div>
        <Button onClick={displayModal}>Add</Button>
        <TextField label="Search lobbies" onChange={filterLobbies} />
      </div>
      <div className={style.lobbyContainer}>
        {lobbies.length === 0 ? (
          <p>No Lobbies :(</p>
        ) : (
          lobbies.map(lobby => {
            return (
              lobby.name.includes(filter) && (
                <LobbyTile
                  name={lobby.name}
                  id={lobby._id}
                  isPublic={lobby.isPublic}
                  key={lobby._id}
                />
              )
            );
          })
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
