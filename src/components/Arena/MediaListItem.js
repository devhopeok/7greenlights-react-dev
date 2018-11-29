import React, { PropTypes, Component } from 'react';
import tickedIcon from './img/ticked.png';
import untickedIcon from './img/unticked.png';
import Greenlight from '../Greenlight/Greenlight';
import mediaPlaceholder from './img/media-ph.svg';

class MediaListItem extends Component {

  constructor() {
    super();
    this.state = { ticked: false };
  }

  clickAction() {
    const { addField, removeField, media } = this.props;
    const { ticked } = this.state;
    this.setState({ ticked: !ticked });

    ticked ? removeField(media) : addField(media);
  }

  render() {
    const { media, greenlightMedia } = this.props;
    const { ticked } = this.state;

    return (
      <div className="list-item-container">
        <div className="media-list-item">
          <img className="media-item-img" src={media.image || mediaPlaceholder} />
          <div className="media-info">
            <label className="media-name">{media.name}</label>
            <Greenlight
              dark={true}
              counter={media.greenlights_count}
              greenlit={media.greenlit}
              greenlightAction={() => greenlightMedia(media.id)}
            />
          </div>
          <button type="button" onClick={() => this.clickAction()}>
            <img className="checkbox" src={ticked ? tickedIcon : untickedIcon} />
          </button>
        </div>
        <div className="divider-line" />
      </div>
    );
  }
}

MediaListItem.propTypes = {
  addField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  media: PropTypes.object,
  greenlightMedia: PropTypes.func.isRequired,
};

export default MediaListItem;
