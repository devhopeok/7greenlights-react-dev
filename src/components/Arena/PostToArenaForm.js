import React, { PropTypes, Component } from 'react';
import MediaListItem from './MediaListItem';

class PostToArenaForm extends Component {
  componentDidMount() {
    let scrollingDiv = document.getElementById('post-media-list');
    scrollingDiv.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillUnmount() {
    let scrollingDiv = document.getElementById('post-media-list');
    scrollingDiv.removeEventListener('scroll', this.fetchNextPage);
  }

  fetchNextPage = (e) => {
    const { fetchMedia, currentMyMediaPage } = this.props;
    let scrollingDiv = e.currentTarget;

    if (scrollingDiv.scrollTop + scrollingDiv.offsetHeight ===
        scrollingDiv.scrollHeight) {
      fetchMedia(currentMyMediaPage);
    }
  };

  render() {
    const { myMedia, submitMedia, addMediaToPost, greenlightMedia,
      removeMediaToPost } = this.props;

    return (
      <div className="media-form-container">
        <div id="post-media-list" className="post-media-list">
          {
            myMedia && myMedia.map((media, index) =>
              <MediaListItem
                key={index}
                addField={addMediaToPost}
                removeField={removeMediaToPost}
                media={media}
                greenlightMedia={greenlightMedia}
              />)
          }
          {
            (!myMedia || !myMedia.length) &&
            <h2>No Media content to display</h2>
          }
        </div>
        <div className="post-button-container">
          <button type="button"
            onClick={submitMedia}
            className="dark-button post-media"
          >
            post media
          </button>
        </div>
      </div>
    );
  }
}

PostToArenaForm.propTypes = {
  myMedia: PropTypes.array,
  submitMedia: PropTypes.func.isRequired,
  addMediaToPost: PropTypes.func.isRequired,
  removeMediaToPost: PropTypes.func.isRequired,
  currentMyMediaPage: PropTypes.number.isRequired,
  fetchMedia: PropTypes.func.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
};

export default PostToArenaForm;
