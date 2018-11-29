import React, { PropTypes } from 'react';
import spotifyUri from 'spotify-uri';

const SpotifyEmbed = ({ url }) => {
  const uri = spotifyUri.formatEmbedURL(spotifyUri.parse(url));

  return (
    <iframe
      src={uri}
      width="300"
      height="380"
      frameBorder="0"
      allowTransparency="true"
    />
  );
};

SpotifyEmbed.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SpotifyEmbed;
