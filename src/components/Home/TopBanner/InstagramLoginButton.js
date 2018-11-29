import React, { PropTypes, Component } from 'react';
import instagramIcon from '../img/instagram-logo.png';
import instagramIconDark from '../img/instagram-logo-dark.png';

class InstagramLoginButton extends Component {

  componentDidMount() {
    const { windowLocation, onSuccess, onFailure } = this.props;

    let hash = windowLocation.hash;
    if (hash.includes('access_token')) {
      onSuccess(hash.replace('#access_token=', ''));
    } else if (window.location.search.includes('error')) {
      onFailure({
        error: windowLocation.query.error,
        error_reason: windowLocation.query.error_reason,
        error_description: windowLocation.query.error_description,
      });
    }
  }

  onBtnClick() {
    const { clientId, scope } = this.props;
    const redirectUri = window.location.href;
    const authorizeBase = 'https://api.instagram.com/oauth/authorize/';
    const queryString = `?client_id=${clientId}&scope=${scope}&response_type=token&redirect_uri=${redirectUri}`;

    window.location.href = `${authorizeBase}${queryString}`;
  }

  render() {
    const { cssClass, buttonText, isDark } = this.props;
    return (
      <button
        className={cssClass}
        onClick={this.onBtnClick.bind(this)}
      >
        <img
          src={isDark ? instagramIconDark : instagramIcon}
          className="small-right-space icon-size"
        />
        {buttonText}
      </button>
    );
  }
}

InstagramLoginButton.propTypes = {
  clientId: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  scope: PropTypes.string.isRequired,
  windowLocation: PropTypes.object.isRequired,
  cssClass: PropTypes.string,
  isDark: PropTypes.bool,
};

export default InstagramLoginButton;
