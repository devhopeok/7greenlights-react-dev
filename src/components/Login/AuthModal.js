import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import LoginContainer from '../../containers/Login';
import FacebookLogin from 'react-facebook-login';
import InstagramLoginButton from '../Home/TopBanner/InstagramLoginButton';
import Config from 'Config';
import { Link } from 'react-router';
import facebookIcon from './img/facebook-logo-dark.png';
import xIcon from './img/x.png';

const AuthModal = ({ isOpen, toggleAuthModal, type, toggleType, fbLoginSuccess,
  igLoginSuccess, igLoginFailure }) => {
  let content, title, bottomSection;
  if (type === 'login') {
    title = "Sign In";
    content = (
      <LoginContainer />
    );
    bottomSection = (
      <label className="bottom-text">{ "Don't have an account?" }
        <button className="bottom-link" onClick={toggleType}>
        Sign Up
        </button>
      </label>
    );
  } else {
    title = "You need an account to do this!";
    content = (
      <div className="signup-box">
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
          isDark={true}
          scope="basic"
        />
        <label className="bottom-text">
          or
          <Link onClick={toggleAuthModal} className="bottom-link" to="/signup">
            sign up
          </Link> with your email
        </label>
      </div>
    );
    bottomSection = (
      <label className="bottom-text">Already have an account?
        <button className="bottom-link" onClick={toggleType}>
        Sign In
        </button>
      </label>
    );
  }

  let buttonBackground = {
    backgroundImage: `url(${xIcon})`,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleAuthModal}
      className="auth-popup"
      overlayClassName="auth-popup-overlay"
    >
      <div className="modal-content-container">
        <button
          className="close-button"
          style={buttonBackground}
          onClick={toggleAuthModal}
        />
        <label className="modal-title">{title}</label>
        <div className="title-divider-line"/>
        { content }
        <div className="lower-divider-line"/>
        { bottomSection }
      </div>
    </Modal>
  );
};

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleAuthModal: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['login', 'signup']).isRequired,
  toggleType: PropTypes.func.isRequired,
  fbLoginSuccess: PropTypes.func.isRequired,
  igLoginSuccess: PropTypes.func.isRequired,
  igLoginFailure: PropTypes.func.isRequired,
};

export default AuthModal;
