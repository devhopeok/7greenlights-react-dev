import React, { PropTypes, Component } from 'react';
import ReactPlayer from 'react-player';
import SpotifyEmbed from './SpotifyEmbed';
import { urlIsSpotify } from 'utils/helpers';
import Config from 'Config';

class Embedder extends Component {
  constructor() {
    super();
    this.state = { invalid: false };
  }

  render() {
    const { mediaUrl } = this.props;
    const { invalid } = this.state;
    const soundCloudClientId = Config.soundCloudClientId;

    return (
      <div className="embedder">
        {
          mediaUrl && invalid &&
          <label className="field-error error-color">
          This URL wasn&#39;t recognized. Supported players are YouTube, Vimeo and SoundCloud
          </label>
        }
        {
          urlIsSpotify(mediaUrl) ?
          <SpotifyEmbed url={mediaUrl} /> :
          <ReactPlayer
            url={mediaUrl}
            hidden={invalid || !mediaUrl}
            controls={true}
            width="580px"
            onError={() => this.setState({ invalid: true })}
            onReady={() => this.setState({ invalid: false })}
            soundcloudConfig={{ clientId: soundCloudClientId, showArtwork: true }}
          />
        }
      </div>
    );
  }
}

Embedder.propTypes = {
  mediaUrl: PropTypes.string,
};

export default Embedder;
