import { connect } from 'react-redux';
import TopBar from '../components/TopBar/TopBar';
import { logout } from '../actions/logoutActions';
import { toggleTopBarModal } from '../actions/commonActions';
import { toggleNotificationModal } from '../actions/notificationsActions';

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    inHomepage: state.commonReducer.inHomepage,
    shouldDisplayTopBarModal: state.commonReducer.shouldDisplayTopBarModal,
    authenticated: state.loginReducer.authenticated,
    hasNewNotification: state.notificationsReducer.newNotification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
    toggleTopBarModal: () => {
      dispatch(toggleTopBarModal());
    },
    toggleNotificationModal: () => dispatch(toggleNotificationModal()),
  };
};

const TopBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopBar);

export default TopBarContainer;
