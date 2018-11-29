import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router';
import PostToArenaForm from './PostToArenaForm';
import xIcon from '../Login/img/x.png';

const PostToArena = ({ myMedia, displayPostToArena, togglePostToArena,
  postMediaToArena, addMediaToPost, removeMediaToPost, arena,
  mediasToPost, fetchMedia, currentMyMediaPage, greenlightMedia }) => {

  return (
    <Modal
      isOpen={displayPostToArena}
      onRequestClose={() => togglePostToArena()}
      className="post-arena-popup"
      overlayClassName="post-arena-overlay"
    >
      <div className="post-arena-container">
        <div className="post-arena-header">
          <button className="close-button" onClick={() => togglePostToArena()}>
            <img src={xIcon} />
          </button>
          <div className="title">
            <h1>Select from My Media or</h1>
            <Link to="/mymedia">upload new media</Link>
          </div>
        </div>
        <PostToArenaForm myMedia={myMedia}
          submitMedia={() => postMediaToArena(mediasToPost, arena.id)}
          addMediaToPost={addMediaToPost}
          removeMediaToPost={removeMediaToPost}
          fetchMedia={fetchMedia}
          currentMyMediaPage={currentMyMediaPage}
          greenlightMedia={greenlightMedia}
        />
      </div>
    </Modal>
  );
};

PostToArena.propTypes = {
  myMedia: PropTypes.array,
  displayPostToArena: PropTypes.bool.isRequired,
  togglePostToArena: PropTypes.func.isRequired,
  postMediaToArena: PropTypes.func.isRequired,
  addMediaToPost: PropTypes.func.isRequired,
  removeMediaToPost: PropTypes.func.isRequired,
  arena: PropTypes.object.isRequired,
  mediasToPost: PropTypes.array,
  currentMyMediaPage: PropTypes.number.isRequired,
  fetchMedia: PropTypes.func.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
};

export default PostToArena;
