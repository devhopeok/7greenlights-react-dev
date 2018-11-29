import React, { PropTypes } from 'react';
import * as constants from '../../constants';

const MediaListEmpty = ({ type }) => {
  const typesList = constants.mediaListIds;
  let iconClass, primaryText, secondaryText;

  switch (type) {
    case typesList.myMedia: {
      iconClass = 'mymedia';
      primaryText = 'Your Media is empty!';
      secondaryText = 'Upload some content and show your talent to the world!';
      break;
    }
    case typesList.myStream: {
      iconClass = 'mystream';
      primaryText = 'Your Stream is empty!';
      secondaryText = 'Explore new content and find amazing people!';
      break;
    }
    case typesList.arenaPage: {
      iconClass = 'arenapage';
      primaryText = 'This Venue™ is empty!';
      secondaryText = 'Post some media and share content with the community!';
      break;
    }
    case typesList.profilePage: {
      iconClass = 'mymedia';
      primaryText = 'Looks like there is no Media yet!';
      secondaryText = 'Come back later and check again.';
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className="media-empty">
      <div className={`icon ${iconClass}`}/>
      <div className="divider-line" />
      <label>{primaryText}</label>
      <label>{secondaryText}</label>
    </div>
  );
};

MediaListEmpty.propTypes = {
  type: PropTypes.number,
};

export default MediaListEmpty;
