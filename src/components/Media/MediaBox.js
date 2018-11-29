import React, { PropTypes, Component } from 'react';
import Embedder from './Embedder';
import shareIcon from './img/share-icon.png';
import pencilIcon from './img/pencil-icon.png';
import trashIcon from './img/trash-icon.png';
import Greenlight from '../Greenlight/Greenlight';
import speakerIcon from '../Blast/img/green-speaker.png';
import linkIcon from './img/link-icon.png';
import { Link } from 'react-router';
import profilePlaceholder from '../App/img/profile-ph.png';
import NotesBox from './NotesBox';
import { connect } from 'react-redux';
import { toggleReportModal, uploadNote } from '../../actions/mediaActions';
import { toggleAuthModal } from 'actions/commonActions';

let MediaBox = class MediaBox extends Component {

  constructor () {
    super();
    this.state = { highlighted: false };
  }

  componentWillMount() {
    const { media } = this.props;
    if (media.highlight) {
      this.setState({ highlighted: true });
      setTimeout(() => this.setState({ highlighted: false }), 1000);
    }
  }

  render () {
    const { media, deleteMedia, setEditMode, greenlightMedia,
      greenlightUser, user, toggleReportModal, toggleShareModal, uploadNote,
      toggleNoteModal, isFirst, toggleAuthModal } = this.props;

    const { highlighted } = this.state;

    let isMine = user && (media.author.id == user.id);
    const greenlitClass = media.greenlit ? 'gradient-greenlit' : '';
    const highlightClass = highlighted ? 'highlighted' : '';

    return (
      <div
        className={`${greenlitClass} media-box edit-media ${highlightClass}`}
        id={`media-${media.id}`}
        >
        <div className="media-top-bar">
          <h1>{media.name}</h1>
          <div className="media-controls">
            {
              setEditMode &&
              <button
                className="icon"
                onClick={() => setEditMode(media)}
                >
                <img src={pencilIcon} />
              </button>
            }
            {
              deleteMedia &&
              <button
                className="icon"
                onClick={() => deleteMedia(media.id)}
                >
                <img src={trashIcon} />
              </button>
            }
            {
              (setEditMode || deleteMedia) &&
              <div className="line"/>
            }
            <Greenlight
              greenlit={media.greenlit}
              counter={media.greenlights_count}
              greenlightAction={() => greenlightMedia(media.id)}
              noPadding={true}
              />
          </div>
        </div>

        <div className="media-user-box">
          <img
            className="user-picture"
            src={media.author.picture || profilePlaceholder}
            />
          <div className="user-info">
            <div className="username-gl">
              <Link to={`/profile/${media.author.id}`}>
                {media.author.username}
              </Link>
              {
                (!isMine) &&
                <Greenlight
                  greenlit={media.author.greenlit}
                  greenlightAction={() => greenlightUser(media.author.id)}
                  noPadding={true}
                  />
              }
            </div>
            {
              media.author.last_blast &&
              <div className="blast-container">
                <img className="blast-icon" src={speakerIcon} />
                <label>{`"${media.author.last_blast}"`}</label>
              </div>
            }
          </div>
        </div>

        <Embedder mediaUrl={media.media_url}/>

        <NotesBox
          isPendingApproval={media.reported && isMine}
          uploadNote={(note) => uploadNote(media.id, note)}
          media={media}
          isMine={isMine}
          toggleNoteModal={toggleNoteModal}
          isFirstMedia={isFirst}
          authenticated={Boolean(user)}
          toggleAuthModal={toggleAuthModal}
        />

        <div className="line" />

        <div className="media-links">
          <div className="available-on">
            <label>Available on</label>
            {
              media.links && media.links.map( (link, index) =>
              <a key={index} href={link.url}>
                <img className="link-icon" src={linkIcon} />
              </a>
            )
          }
        </div>
        <div className="report-share">
          {
            (!isMine) &&
            <button onClick={() => toggleReportModal(media.id)}>
              Report
            </button>
          }
          <button onClick={() => toggleShareModal(media)}>
            <img className="share" src={shareIcon} />
          </button>
        </div>
      </div>
    </div>
  );
  }
};

MediaBox = connect(
  () => ({}),
  (dispatch) => ({
    toggleReportModal: (id) => dispatch(toggleReportModal(id)),
    uploadNote: (mediaId, note) => dispatch(uploadNote(mediaId, note)),
    toggleAuthModal: () => dispatch(toggleAuthModal()),
  })
)(MediaBox);

MediaBox.propTypes = {
  media: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
  greenlightUser: PropTypes.func.isRequired,
  setEditMode: PropTypes.func,
  deleteMedia: PropTypes.func,
  toggleReportModal: PropTypes.func,
  toggleShareModal: PropTypes.func,
  toggleNoteModal: PropTypes.func.isRequired,
  uploadNote: PropTypes.func,
  isFirst: PropTypes.bool,
  toggleAuthModal: PropTypes.func,
};

export default MediaBox;
