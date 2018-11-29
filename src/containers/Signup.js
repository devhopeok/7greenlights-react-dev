import { connect } from 'react-redux';
import Signup from '../components/Signup/Signup';
import { signup, exitSignup } from '../actions/signupActions';

const mapStateToProps = (state) => {
  return {
    socialNetwork: state.signupReducer.socialNetwork,
    snAccessToken: state.signupReducer.snAccessToken,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignup: (signupData, socialNetwork, accessToken) => {
      if (socialNetwork && socialNetwork !== '') {
        signupData.type = socialNetwork;
        signupData.access_token = accessToken;
      }

      return dispatch(signup(signupData));
    },
    exitSignup: () => {
      dispatch(exitSignup());
    }
  };
};

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default SignupContainer;
