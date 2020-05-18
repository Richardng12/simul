import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SimulAppBar from '../musicPage/components/appBar';
import AddLobbyModal from './addLobbyModal';
import { getUserInfo } from '../../store/profile/profileActions';
import { getAllLobbies } from '../../store/lobby/lobbyActions';
import style from './lobbyPage.module.css';
import LobbyTile from './LobbyTile';
import Loader from '../../general/Loader';
import text from '../../general/text';
import SearchField from '../../general/SearchField';

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
    <Loader />
  ) : (
    <div className={style.lobbyParent}>
      <div className={style.headerContainer}>
        <SimulAppBar title="LOBBIES" />
      </div>
      <AddLobbyModal open={showModal} onClose={closeModal} />
      <div className={style.searchContainer}>
        <Button onClick={displayModal} className={style.addButton}>
          {text.lobbyPage.addLobby}
        </Button>
        <SearchField
          label={text.lobbyPage.search}
          onChange={filterLobbies}
          className={style.searchField}
        />
      </div>
      <div className={style.lobbyContainer}>
        {lobbies.length === 0 ? (
          <p>No Lobbies :(</p>
        ) : (
          [...lobbies].reverse().map(lobby => {
            return (
              lobby.name.includes(filter) && (
                <LobbyTile
                  name={lobby.name}
                  id={lobby._id}
                  isPublic={lobby.isPublic}
                  password={lobby.password}
                  createdBy={lobby.createdBy}
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
