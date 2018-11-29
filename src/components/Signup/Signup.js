import React, { Component, PropTypes } from 'react';
import SignupForm from './SignupForm';

class Signup extends Component {
  componentWillUnmount() {
    this.props.exitSignup();
  }

  render() {
    const { submitSignup, socialNetwork, snAccessToken } = this.props;

    return (
      <div className="signup-container full-page aurora-bg">
        <h1>Create your account</h1>
        <SignupForm
          socialNetwork={socialNetwork}
          submitSignup={
            (data) => submitSignup(data, socialNetwork, snAccessToken)
          }
        />
      </div>
    );
  }
}

Signup.propTypes = {
  submitSignup: PropTypes.func.isRequired,
  toggleInHomepage: PropTypes.func.isRequired,
  exitSignup: PropTypes.func.isRequired,
  socialNetwork: PropTypes.string,
  snAccessToken: PropTypes.string,
};

export default Signup;
