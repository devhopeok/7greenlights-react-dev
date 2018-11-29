import React, { Component, PropTypes } from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';

class UpdatePassword extends Component {

  componentWillMount() {
    this.props.initializeEditPassword();
  }

  render() {
    const { submitUpdatePassword, params, passwordUpdated, errorMessage } = this.props;

    const successMessage = () => {
      return (
        <div className="password-success-message">
          <p>Your Password has been successfully updated.</p>
          <div><a className="password-home-link" href="/">Return home</a></div>
        </div>
      );
    };

    const updatedPasswordFormComp = () => {
      return (
        <div>
          <h1>Forgot Password?</h1>
          <UpdatePasswordForm
            submitUpdatePassword={submitUpdatePassword}
            params={params}
          />
          { errorMessage && <div className="password-error-message">{errorMessage}</div> }
        </div>
      );
    };

    return (
      <div className="signup-container full-page aurora-bg">
        {
          !passwordUpdated ? updatedPasswordFormComp(): successMessage()
        }
      </div>
    );
  }
}

UpdatePassword.propTypes = {
  submitUpdatePassword: PropTypes.func.isRequired,
  initializeEditPassword: PropTypes.func.isRequired,
  params: PropTypes.object,
  passwordUpdated: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default UpdatePassword;
