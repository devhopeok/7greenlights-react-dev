import React, { PropTypes, Component } from 'react';
import TopBarContainer from '../../containers/TopBar';
import AuthModalContainer from '../../containers/AuthModal';
import MessageModal from './MessageModal';
import BurgerMenu from 'components/TopBar/BurgerMenu';

class App extends Component {
  componentWillMount() {
    const { authenticated, user, setUpPusher } = this.props;
    authenticated && setUpPusher(user.channel);
  }

  render() {
    const { children, getNotifications, authenticated } = this.props;
    let notificationsPage = 1;
    authenticated && getNotifications(notificationsPage);

    return (
      <div className="page-content" id="outer-container">
        {
          authenticated &&
          <BurgerMenu
            pageWrapId="content-container"
            outerContainerId="outer-container"
          />
        }
        <TopBarContainer />
        <div id="content-container" className="content-container">
          { children }
          <AuthModalContainer />
          <MessageModal />
        </div>
        { /* Footer component goes here*/ }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  getNotifications: PropTypes.func.isRequired,
  setUpPusher: PropTypes.func.isRequired,
  user: PropTypes.object,
  authenticated: PropTypes.bool,
};

export default App;
