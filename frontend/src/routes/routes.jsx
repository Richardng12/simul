import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../pages/landingPage';
import LobbyPage from '../pages/lobbyPage';
import MusicPage from '../pages/musicPage';

const paths = {
  LANDING_PAGE: '/',
  MUSiC_PAGE: '/music',
  LOBBY_PAGE: '/lobbies',
};

const routes = (
  <Switch>
    <Route exact path={paths.LANDING_PAGE} component={LandingPage} />
    <Route exact path={paths.LOBBY_PAGE} component={LobbyPage} />
    <Route exact path={paths.MUSiC_PAGE} component={MusicPage} />
  </Switch>
);

export default routes;
