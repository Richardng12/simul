import React from 'react';
import { useHistory } from 'react-router';
import style from './LobbyTile.module.css';

const LobbyTile = props => {
  const { name, id } = props;
  const history = useHistory();

  const changeHistory = path => {
    history.push(path);
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={style.lobbyTile} onClick={() => changeHistory(`/lobby/${id}`)}>
      {name}
    </div>
  );
};

export default LobbyTile;
