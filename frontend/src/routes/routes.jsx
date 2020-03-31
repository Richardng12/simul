import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../pages/landingPage/landingPage';
import LobbyPage from '../pages/lobbyPage/lobbyPage';
import MusicPage from '../pages/musicPage/musicPage';

const paths = {
  LANDING_PAGE: '/',
  MUSiC_PAGE: '/music',
  LOBBY_PAGE: '/lobbies',
  LOGIN: '/login',
};

const routes = (
  <Switch>
    <Route exact path={paths.LANDING_PAGE} component={LandingPage} />
    <Route exact path={paths.LOBBY_PAGE} component={LobbyPage} />
    <Route exact path={paths.MUSiC_PAGE} component={MusicPage} />
    <Route
      exact
      path={paths.LOGIN}
      component={() => {
        window.location.href = 'http://localhost:8888/auth/spotify';
        return null;
      }}
    />
  </Switch>
);

export default routes;
