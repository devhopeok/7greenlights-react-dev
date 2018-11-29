import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/App';
import SignupContainer from './containers/Signup';
import HomeContainer from './containers/Home';
import MyMediaContainer from './containers/MyMedia';
import MyStreamContainer from './containers/MyStream';
import ArenaContainer from './containers/Arena';
import ProfileContainer from './containers/Profile';
import UpdatePasswordContainer from './containers/UpdatePassword';
import AboutContainer from './containers/About';
import FeaturedNotesContainer from './containers/FeaturedNotes';

export const getRoutes = (store) => {
  const checkAuth = (nextState, transition) => {
    const state = store.getState();

    if (!state.loginReducer.authenticated) {
      transition({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/mymedia" component={MyMediaContainer} onEnter={checkAuth} />
      <Route
        path="/mystream"
        component={MyStreamContainer}
        onEnter={checkAuth}
      />
      <Route path="/about" component={AboutContainer} />
      <Route
        path="/media/:mediaId/notes"
        component={FeaturedNotesContainer}
        onEnter={checkAuth}
      />
      <Route path="/arena/:arenaId" component={ArenaContainer} />
      <Route path="/profile/:profileId" component={ProfileContainer} />
      <Route path="/password/edit/:passwordToken" component={UpdatePasswordContainer} />

    </Route>
  );
};
