import { connect } from 'react-redux';
import App from '../components/App/App';
import { getNotifications } from '../actions/notificationsActions';
import { setUpPusher } from '../actions/pusherActions';

const mapStateToProps = (state) => {
  return {
    authenticated: state.loginReducer.authenticated,
    user: state.loginReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotifications: (page) => dispatch(getNotifications(page)),
    setUpPusher: (channelId) => dispatch(setUpPusher(channelId)),
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppContainer;
