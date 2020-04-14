import React from 'react';
import { useHistory } from 'react-router';
import style from './LobbyTile.module.css';

const LobbyTile = props => {
  const { name, key } = props;
  const history = useHistory();

  const changeHistory = path => {
    history.push(path);
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div key={key} className={style.lobbyTile} onClick={() => changeHistory(`/lobby/${name}`)}>
      {name}
    </div>
  );
};

export default LobbyTile;
