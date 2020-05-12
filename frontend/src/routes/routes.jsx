import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SPOTIFY_AUTH } from '../config/config';

import LandingPage from '../pages/landingPage/landingPage';
import LobbyPage from '../pages/lobbyPage/lobbyPage';
import MusicPage from '../pages/musicPage/musicPage';
import Test from '../Test';

const paths = {
  LANDING_PAGE: '/',
  MUSIC_PAGE: '/music',
  LOBBY_PAGE: '/lobby',
  LOGIN: '/login',
  TEST: '/test',
  LOBBY: '/lobby/:id',
};

const routes = (
  <Switch>
    <Route exact path={paths.LANDING_PAGE} component={LandingPage} />
    <Route exact path={paths.LOBBY_PAGE} component={LobbyPage} />
    <Route exact path={paths.MUSIC_PAGE} component={MusicPage} />
    <Route path={paths.LOBBY} component={MusicPage} />
    <Route
      exact
      path={paths.LOGIN}
      component={() => {
        window.location.href = SPOTIFY_AUTH;
        return null;
      }}
    />
    <Route exact path={paths.TEST} component={Test} />
  </Switch>
);

export default routes;
