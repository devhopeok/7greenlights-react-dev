import React, { Component, PropTypes } from 'react';
import MediaList from '../Media/MediaList';
import ArenaCover from './ArenaCover';
import PostToArena from './PostToArena';
import { mediaListIds } from '../../constants';
import ShareModal from '../Share/ShareModal';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

class Arena extends Component {
  componentWillMount() {
    const { fetchArena, params, fetchMedia, filterSortData,
      currentMyMediaPage, authenticated } = this.props;

    fetchArena(params.arenaId, filterSortData);
    authenticated && fetchMedia(currentMyMediaPage);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillReceiveProps(nextProps) {
    const { params, fetchArenasMedia, filterSortData } = this.props;
    let filtered = true;
    let page = 1;
    if (this.propsHaveChanged(filterSortData, nextProps.filterSortData)) {
      fetchArenasMedia(params.arenaId, page, nextProps.filterSortData,
        filtered);
    }
  }

  componentWillUnmount() {
    const { displayPostToArena, togglePostToArena } = this.props;
    window.removeEventListener('scroll', this.fetchNextPage);
    displayPostToArena && togglePostToArena();
  }

  propsHaveChanged(props, nextProps) {
    return (props.filters !== nextProps.filters ||
    props.sortType !== nextProps.sortType ||
    props.sortOrder !== nextProps.sortOrder ||
    props.typeIds !== nextProps.typeIds ||
    props.popIds !== nextProps.popIds);
  }

  fetchNextPage = () => {
    const { fetchArenasMedia, filterSortData, currentPage, params } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      fetchArenasMedia(params.arenaId, currentPage, filterSortData);
    }
  }

  render() {
    const { arena, greenlightArena, myMedia, displayPostToArena,
      togglePostToArena, greenlightMedia, postMediaToArena,
      mediasToPost, addMediaToPost, removeMediaToPost, currentMyMediaPage,
      fetchMedia, toggleAuthModal, authenticated, displayShareModal,
      toggleShareModal, sharingObject } = this.props;

    return (
      <div className="full-page outerspace-bg">
        <ArenaCover
          arena={arena}
          greenlightArena={(event) => greenlightArena(event, arena.id)}
          image={arena.image}
          toggleShareModal={() => toggleShareModal(arena)}
        />
        <Tooltip tooltipId={tooltipIds.arenaSponsoring} />
        <div className="arena-media-container">
          <div className="arena-controls">
            <div className="has-tooltip">
              <button
                onClick={authenticated ? togglePostToArena : toggleAuthModal}
                className="form-button post-media">
                post media
              </button>
              <Tooltip tooltipId={tooltipIds.arenaPost} />
            </div>
          </div>
          <MediaList
            greenlightMedia={greenlightMedia}
            media={arena.media_contents}
            hasPopsFilter
            type={mediaListIds.arenaPage}
          />
        </div>
        <PostToArena
          myMedia={myMedia}
          arena={arena}
          displayPostToArena={displayPostToArena}
          togglePostToArena={togglePostToArena}
          postMediaToArena={postMediaToArena}
          addMediaToPost={addMediaToPost}
          removeMediaToPost={removeMediaToPost}
          mediasToPost={mediasToPost}
          currentMyMediaPage={currentMyMediaPage}
          fetchMedia={fetchMedia}
          greenlightMedia={greenlightMedia}
        />
        {
          sharingObject &&
          <ShareModal
            isOpen={displayShareModal}
            toggleShareModal={toggleShareModal}
            sharingObject={sharingObject}
          />
        }
      </div>
    );
  }
}

Arena.propTypes = {
  arena: PropTypes.object,
  myMedia: PropTypes.array,
  displayPostToArena: PropTypes.bool.isRequired,
  togglePostToArena: PropTypes.func.isRequired,
  fetchArenasMedia: PropTypes.func.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
  fetchArena: PropTypes.func.isRequired,
  fetchMedia: PropTypes.func.isRequired,
  greenlightArena: PropTypes.func.isRequired,
  postMediaToArena: PropTypes.func.isRequired,
  mediasToPost: PropTypes.array,
  addMediaToPost: PropTypes.func.isRequired,
  removeMediaToPost: PropTypes.func.isRequired,
  params: PropTypes.object,
  filterSortData: PropTypes.object,
  toggleAuthModal: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  currentPage: PropTypes.number.isRequired,
  currentMyMediaPage: PropTypes.number.isRequired,
  displayShareModal: PropTypes.bool,
  sharingObject: PropTypes.object,
  toggleShareModal: PropTypes.func.isRequired,
};

export default Arena;
