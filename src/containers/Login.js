import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import { login, clearLoginModalMessages } from '../actions/loginActions';
import { forgotPassword } from '../actions/passwordsActions';

const mapStateToProps = (state) => {
  return {
    user: state.loginReducer.user,
    loginError: state.loginReducer.loginError,
    forgotPasswordError: state.passwordReducer.forgotPasswordError,
    forgotPasswordSuccess: state.passwordReducer.forgotPasswordSuccess,
    isForgotPassword: state.passwordReducer.isForgotPassword
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (loginData) => {
      dispatch(login(loginData));
    },
    submitForgotPassword: (forgotPasswordData) => {
      dispatch(forgotPassword(forgotPasswordData));
    },
    clearLoginModalMessages: () => {
      dispatch(clearLoginModalMessages());
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
