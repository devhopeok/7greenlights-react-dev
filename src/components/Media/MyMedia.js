import React, { Component, PropTypes } from 'react';
import BlastBox from '../Blast/BlastBox';
import EditMedia from './EditMedia';
import MediaList from './MediaList';
import { mediaListIds, tooltipIds } from 'constants';
import Tooltip from 'components/Tooltip/Tooltip';
import { getParameterByName } from 'utils/helpers';

class MyMedia extends Component {

  componentWillMount() {
    const { fetchMedia, filters, sort, sortOrder, currentPage } = this.props;
    fetchMedia(currentPage, filters, sort, sortOrder,
      getParameterByName('media'));
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchMedia, filters, sort, sortOrder, typeIds,
      currentPage } = this.props;

    if (filters !== nextProps.filters ||
        sort !== nextProps.sort ||
        sortOrder !== nextProps.sortOrder ||
        typeIds !== nextProps.typeIds) {

      let filtered = true;
      fetchMedia(currentPage, nextProps.filters, nextProps.sort,
        nextProps.sortOrder, getParameterByName('media'), nextProps.typeIds,
        filtered);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchNextPage);
  }

  fetchNextPage = () => {
    const { fetchMedia, filters, sort, sortOrder, currentPage } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      fetchMedia(currentPage, filters, sort, sortOrder);
    }
  }

  render() {
    const { uploadMedia, setMediaLink, updateCurrentLink, currentWhereLink,
      mediaUrl, myMedia, updateMedia, deleteMedia, setEditMode,
      shouldDisplayUpload, toggleUploadMedia, editingId, toggleEditMedia, user,
      greenlightMedia } = this.props;

    return (
      <div className="full-page outerspace-bg">
        <div className="mymedia-container">
          <div className="title-container">
            <h1>My Media</h1>
            <div className="divider-line" />
            <button
              onClick={toggleUploadMedia}
              className="form-button has-tooltip"
            >
              Upload Media
              <Tooltip tooltipId={tooltipIds.myMediaUpload} />
            </button>
          </div>
          {
            shouldDisplayUpload &&
            <EditMedia
              uploadMedia={uploadMedia}
              mode="upload"
              updateCurrentLink={updateCurrentLink}
              currentWhereLink={currentWhereLink}
              mediaUrl={mediaUrl}
              setMediaLink={setMediaLink}
              updateMedia={updateMedia}
              toggleUploadMedia={toggleUploadMedia}
            />
          }
          <BlastBox mediaVersion />
          <MediaList
            media={myMedia}
            deleteMedia={deleteMedia}
            setEditMode={setEditMode}
            editingId={editingId}
            updateMedia={updateMedia}
            setMediaLink={setMediaLink}
            updateCurrentLink={updateCurrentLink}
            currentWhereLink={currentWhereLink}
            mediaUrl={mediaUrl}
            toggleEditMedia={toggleEditMedia}
            user={user}
            greenlightMedia={greenlightMedia}
            type={mediaListIds.myMedia}
          />
        </div>
      </div>
    );
  }
}

MyMedia.propTypes = {
  uploadMedia: PropTypes.func.isRequired,
  setMediaLink: PropTypes.func.isRequired,
  fetchMedia: PropTypes.func.isRequired,
  updateCurrentLink: PropTypes.func.isRequired,
  currentWhereLink: PropTypes.string.isRequired,
  setEditMode: PropTypes.func.isRequired,
  updateMedia: PropTypes.func.isRequired,
  deleteMedia: PropTypes.func.isRequired,
  toggleUploadMedia: PropTypes.func.isRequired,
  toggleEditMedia: PropTypes.func.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  editingId: PropTypes.number,
  shouldDisplayUpload: PropTypes.bool,
  myMedia: PropTypes.array,
  mediaUrl: PropTypes.string,
  filters: PropTypes.array,
  sort: PropTypes.number,
  sortOrder: PropTypes.number,
  currentPage: PropTypes.number,
  typeIds: PropTypes.array,
};

export default MyMedia;
