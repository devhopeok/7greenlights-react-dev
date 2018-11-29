import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      isForgotPassword: false
    };
  }

  componentWillMount() {
    let user = this.props.user;
    if (user && user.token) {
      browserHistory.push('/');
    }
  }

  toggleForms = () => {
    this.setState({ isForgotPassword: !this.state.isForgotPassword });
  }

  render() {
    const {
      submitLogin,
      submitForgotPassword,
      loginError,
      forgotPasswordSuccess,
      forgotPasswordError,
      clearLoginModalMessages
    } = this.props;
    let loginErrorMessage;
    if (loginError) {
      loginErrorMessage = (
        <label className="login-error error-color strong">{loginError}</label>
      );
    }

    return (
      <div className="login-container">
        { !this.state.isForgotPassword ?
            <LoginForm
              submitLogin={submitLogin}
              clearMessages={clearLoginModalMessages}
              toggleForms={this.toggleForms}
            /> :
            <ForgotPasswordForm
              submitForgotPassword={submitForgotPassword}
              errorMessage={forgotPasswordError}
              successMessage={forgotPasswordSuccess}
              clearMessages={clearLoginModalMessages}
              toggleForms={this.toggleForms}
            />
        }
        { loginErrorMessage }
      </div>
    );
  }
}

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  submitForgotPassword: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  forgotPasswordSuccess: PropTypes.string,
  forgotPasswordError: PropTypes.string,
  clearLoginModalMessages: PropTypes.func.isRequired
};

export default Login;
