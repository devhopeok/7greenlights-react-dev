import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import twitterIconDark from './img/twitter-dark.png';
import facebookIconDark from './img/facebook-dark.png';
import Config from 'Config';
import { shareableTypes } from '../../constants';
import { mediaLink } from 'utils/helpers';

class ShareModal extends Component {

  componentDidMount() {
    this.facebookInit();
  }

  sharingType = (sharingObject) => {
    const { arena, media } = shareableTypes;
    if (!sharingObject) return;
    return ('media_contents' in sharingObject) ? arena : media;
  }

  facebookInit = () => {
    let fbRoot = document.getElementById('fb-root');

    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';

      document.body.appendChild(fbRoot);
    }

    window.fbAsyncInit = () => {
      window.FB.init({
        version: 'v2.8',
        appId: Config.facebookAppId,
        xfbml: false,
        cookie: false,
      });

      if (window.location.search.includes('facebookdirect')) {
         window.FB.getLoginStatus(this.checkLoginAfterRefresh);
      }
    };

    // Load the SDK asynchronously
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s); js.id = id;
      js.src = `//connect.facebook.net/en_US/all.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  shareOnFacebook = (url) => {
    // FB is a global variable so I'm turning the linting warning off
    // eslint-disable-next-line no-undef
    FB.ui({
      method: 'share',
      href: url,
    }, function(response) {
      console.log(response);
    });
  }

  shareUrl = (sharingObject) => {
    let url = window.location.href;

    if (this.sharingType(sharingObject) == shareableTypes.arena) {
      return url;
    }

    if (sharingObject && sharingObject.author) {
      const path = mediaLink(sharingObject.author.id, sharingObject.id);
      url = `${window.location.origin}${path}`;
    }
    return url;
  }

  tweetMessage = (sharingObject) => {
    let tweetMessage =
        `Check out ${encodeURIComponent(sharingObject.name)} on 7GreenLights!`;
    return tweetMessage;
  }

  render() {
    const { isOpen, toggleShareModal, sharingObject } = this.props;

    let shareUrl = this.shareUrl(sharingObject);
    let tweetMessage = this.tweetMessage(sharingObject);
    let twitterShareUrl = shareUrl.replace('#', '%23'); // anchor link fix for Twitter
    const twitterWebIntentUrl =
      `https://twitter.com/intent/tweet?url=${twitterShareUrl}&text=${tweetMessage}`;

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleShareModal()}
        className="share-modal"
        overlayClassName="modal-overlay dark"
      >
        <button className="close-button" onClick={() => toggleShareModal()} />
        <h1>Share this content with your friends!</h1>
        <div className="divider-line" />
        <button
          className="connect-button"
          onClick={() => this.shareOnFacebook(shareUrl)}
        >
          <img
            src={facebookIconDark}
            className="facebook-icon"
          />
          Share on Facebook
        </button>
        <button
          type="button"
          className="connect-button"
          onClick={() => window.open(
            twitterWebIntentUrl,
            null,
            "height=420,width=550")
           }
        >
          <img
            src={twitterIconDark}
            className="twitter-icon"
          />
          Share on Twitter
        </button>
      </Modal>
    );
  }
}

ShareModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleShareModal: PropTypes.func.isRequired,
  sharingObject: PropTypes.object,
};

export default ShareModal;
