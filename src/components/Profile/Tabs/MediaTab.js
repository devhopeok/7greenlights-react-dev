import React, { PropTypes } from 'react';
import MediaList from '../../Media/MediaList';
import { mediaListIds } from '../../../constants';

const MediaTab = ({ media, greenlightMedia }) => {
  return (
    <div className="tab">
      <MediaList
        media={media}
        greenlightMedia={greenlightMedia}
        type={mediaListIds.profilePage}
      />
    </div>
  );
};

MediaTab.propTypes = {
  user: PropTypes.object.isRequired,
  media: PropTypes.array.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
};

export default MediaTab;
