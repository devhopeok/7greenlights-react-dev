import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import MediaBox from './MediaBox';
import EditMedia from './EditMedia';
import { greenlightUser, greenlightNote } from '../../actions/greenlightActions';
import ReportModal from '../../containers/ReportModal';
import FilterSort from '../FilterSort/Medias/FilterSort';
import { toggleShareModal } from '../../actions/commonActions';
import { toggleNoteModal } from '../../actions/notesActions';
import ShareModal from '../Share/ShareModal';
import NoteModal from './NoteModal';
import MediaListEmpty from './MediaListEmpty';
import { resetFilters } from 'actions/filtersortActions';

class MediaList extends Component {

  componentDidUpdate() {
    // Scroll down to hashed media
    let object = document.getElementsByClassName('highlighted')[0];
    if (object) {
      let top = object.offsetTop;
      window.scrollTo(0, top - 100);
    }
  }

  componentWillUnmount() {
    const { resetFilters } = this.props;
    resetFilters();
  }

  render() {
    const { media, type, deleteMedia, setEditMode, editingId,
      updateMedia, setMediaLink, updateCurrentLink, currentWhereLink, mediaUrl,
      toggleEditMedia, user, greenlightMedia, greenlightUser, toggleShareModal,
      displayShareModal, sharingObject, hasArenaFilter = false, displayNoteModal,
      hasPopsFilter = false, arenasList, toggleNoteModal, notesModalIndex,
      notesModalMedia, greenlightNote } = this.props;

    return (
      <div className="media-list-container">
        <FilterSort
          id="mediaList"
          hasArena={hasArenaFilter}
          hasPops={hasPopsFilter}
          arenasList={arenasList}
        />
        <div className="media-list">
          {
            media.map((media, index) => {
              if (editingId && (editingId == media.id)) {
                return (
                  <EditMedia
                    key={index}
                    uploadMedia={updateMedia}
                    mode="edit"
                    updateCurrentLink={updateCurrentLink}
                    currentWhereLink={currentWhereLink}
                    mediaUrl={mediaUrl}
                    setMediaLink={setMediaLink}
                    updateMedia={updateMedia}
                    toggleUploadMedia={toggleEditMedia}
                  />);
              } else {
                return (
                  <MediaBox
                    key={index}
                    isFirst={(index === 0)}
                    media={media}
                    deleteMedia={deleteMedia}
                    setEditMode={setEditMode}
                    user={user}
                    greenlightUser={greenlightUser}
                    greenlightMedia={greenlightMedia}
                    toggleShareModal={toggleShareModal}
                    toggleNoteModal={toggleNoteModal}
                  />);
              }
            })
          }
          {
            (!media.length && type) &&
            <MediaListEmpty type={type} />
          }
          {
            (!media.length && !type) &&
            <h1 className="no-media">No Media content to display</h1>
          }
          <ReportModal />
          {
            sharingObject &&
            <ShareModal
              isOpen={displayShareModal}
              toggleShareModal={toggleShareModal}
              sharingObject={sharingObject}
            />
          }
          <NoteModal
            isOpen={displayNoteModal}
            toggleNoteModal={toggleNoteModal}
            media={notesModalMedia}
            index={notesModalIndex}
            greenlightNote={greenlightNote}
          />
        </div>
      </div>
    );
  }
}

MediaList.propTypes = {
  user: PropTypes.object,
  media: PropTypes.array,
  deleteMedia: PropTypes.func,
  setEditMode: PropTypes.func,
  updateMedia: PropTypes.func,
  setMediaLink: PropTypes.func,
  updateCurrentLink: PropTypes.func,
  currentWhereLink: PropTypes.string,
  toggleEditMedia: PropTypes.func,
  greenlightMedia: PropTypes.func,
  greenlightUser: PropTypes.func,
  mediaUrl: PropTypes.string,
  editingId: PropTypes.number,
  hasArenaFilter: PropTypes.bool,
  hasPopsFilter: PropTypes.bool,
  arenasList: PropTypes.array,
  toggleShareModal: PropTypes.func,
  displayShareModal: PropTypes.bool,
  sharingObject: PropTypes.object,
  displayNoteModal: PropTypes.bool,
  toggleNoteModal: PropTypes.func.isRequired,
  notesModalMedia: PropTypes.object,
  notesModalIndex: PropTypes.number,
  greenlightNote: PropTypes.func,
  type: PropTypes.number,
  resetFilters: PropTypes.func,
};

// eslint-disable-next-line no-class-assign
MediaList = connect(
  state => ({
    user: state.loginReducer.user,
    displayShareModal: state.shareReducer.displayShareModal,
    sharingObject: state.shareReducer.sharingObject,
    displayNoteModal: state.notesReducer.displayNoteModal,
    notesModalMedia: state.notesReducer.notesModalMedia,
    notesModalIndex: state.notesReducer.notesModalIndex,
  }),
  dispatch => ({
    greenlightUser: (userId) => dispatch(greenlightUser(userId)),
    toggleShareModal: (media) => dispatch(toggleShareModal(media)),
    toggleNoteModal: (media, index) => dispatch(toggleNoteModal(media, index)),
    greenlightNote: (noteId) => dispatch(greenlightNote(noteId)),
    resetFilters: () => dispatch(resetFilters()),
  }),
)(MediaList);

export default MediaList;
