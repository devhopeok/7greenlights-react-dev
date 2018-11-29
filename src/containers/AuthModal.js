import { connect } from 'react-redux';
import AuthModal from '../components/Login/AuthModal';
import { toggleAuthModalType, toggleAuthModal } from '../actions/commonActions';
import { fbLoginSuccess, igLoginSuccess, socialLoginError }
from '../actions/signupActions';

const mapStateToProps = (state) => {
  return {
    isOpen: state.commonReducer.shouldDisplayAuthModal,
    type: state.commonReducer.authModalType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleType: () => {
      dispatch(toggleAuthModalType());
    },
    toggleAuthModal: () => {
      dispatch(toggleAuthModal());
    },
    fbLoginSuccess: (response) => {
      dispatch(fbLoginSuccess(response));
    },
    igLoginSuccess: (response) => {
      dispatch(igLoginSuccess(response));
    },
    igLoginFailure: (error) => {
      dispatch(socialLoginError(error));
    },
  };
};

const AuthModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthModal);

export default AuthModalContainer;
