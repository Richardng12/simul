import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from '../pages/landingPage/landingPage';
import LobbyPage from '../pages/lobbyPage/lobbyPage';
import MusicPage from '../pages/musicPage/musicPage';
import ChatPage from '../pages/chatPage/chatPage';
import Test from '../Test';

const paths = {
  LANDING_PAGE: '/',
  MUSIC_PAGE: '/music',
  LOBBY_PAGE: '/lobbies',
  LOGIN: '/login',
  TEST: '/test',
  CHAT_PAGE: '/chat',
};

const routes = (
  <Switch>
    <Route exact path={paths.LANDING_PAGE} component={LandingPage} />
    <Route exact path={paths.LOBBY_PAGE} component={LobbyPage} />
    <Route exact path={paths.MUSIC_PAGE} component={MusicPage} />
    <Route exact path={paths.CHAT_PAGE} component={ChatPage} />
    <Route
      exact
      path={paths.LOGIN}
      component={() => {
        window.location.href = 'http://localhost:8888/auth/spotify';
        return null;
      }}
    />
    <Route exact path={paths.TEST} component={Test} />
  </Switch>
);

export default routes;
