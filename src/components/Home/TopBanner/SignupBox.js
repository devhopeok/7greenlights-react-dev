import React, { PropTypes } from 'react';
import FacebookLogin from 'react-facebook-login';
import InstagramLoginButton from './InstagramLoginButton';
import Config from 'Config';
import { Link } from 'react-router';
import facebookIcon from '../img/facebook-logo.png';

const SignupBox = ({ igLoginSuccess, fbLoginSuccess, igLoginFailure,
      location }) => {

  return (
    <div className="signup-box">
      <div className="connect-buttons-box">
        <FacebookLogin
          cssClass="connect-button"
          appId={Config.facebookAppId}
          fields="name,email,picture,birthday"
          scope="public_profile,email,user_birthday"
          callback={fbLoginSuccess}
          textButton="connect with facebook"
          icon={<img src={facebookIcon} className="icon-size small-right-space"/>}
        />
        <InstagramLoginButton
          cssClass="connect-button instagram-connect-button"
          clientId={Config.instagramClientId}
          buttonText="connect with instagram"
          onSuccess={igLoginSuccess}
          onFailure={igLoginFailure}
          windowLocation={location}
          scope="basic"
        />
      </div>
      <label className="manual-signup">
        or <Link to={'/signup'}>sign up</Link> with your email
      </label>
    </div>
  );
};

SignupBox.propTypes = {
  fbLoginSuccess: PropTypes.func.isRequired,
  igLoginSuccess: PropTypes.func.isRequired,
  igLoginFailure: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default SignupBox;
