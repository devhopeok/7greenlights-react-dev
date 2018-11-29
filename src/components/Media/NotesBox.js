import React, { PropTypes } from 'react';
import warningIcon from './img/warning.png';
import { Link } from 'react-router';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

const NotesBox = ({ isPendingApproval, uploadNote, media, isMine,
  toggleNoteModal, isFirstMedia, toggleAuthModal, authenticated }) => {
  let noteInputName = `note-pic-input-${media.id}`;
  let handlePicture = (uploadNote) => {
    // Submit picture
    let picFile = document.getElementById(noteInputName).files[0];
    let formData = new FormData();
    formData.append('image', picFile);
    uploadNote(formData);
  };

  return (
    <div className="media-notes-box">
      {
        isPendingApproval &&
        <div className="pending-approval">
          <img src={warningIcon} />
          <label>CONTENT PENDING APPROVAL</label>
        </div>
      }
      <div className="notes-container has-tooltip">
        <span className="note-label">Notes™</span>
        {
          media.featured_notes.map((note, index) => {
            let noteImage = note.thumbnail;
            let backgroundNoteStyle = {
              backgroundImage: `url(${noteImage})`
            };

            return (
              <div
                key={note.id}
                className="note"
                style={noteImage && backgroundNoteStyle}
                onClick={() => toggleNoteModal(media, index)}
              />
            );
          })
        }
        <input
          accept="image/gif, image/jpeg, image/png"
          hidden
          id={noteInputName}
          type="file"
          name="image"
          onChange={() => handlePicture(uploadNote)}
        />
        <button
          className="note-placeholder"
          onClick={() =>
            authenticated ?
            document.getElementById(noteInputName).click() :
            toggleAuthModal()
          }
        > <label>+</label> </button>
        {
          isFirstMedia &&
          <Tooltip tooltipId={tooltipIds.mediaNotes} />
        }
        {
          isMine &&
          <Link
            to={`/media/${media.id}/notes`}
            className="all-notes-link"
          >
            view all Notes™
          </Link>
        }
      </div>
    </div>
  );
};

NotesBox.propTypes = {
  isPendingApproval: PropTypes.bool,
  uploadNote: PropTypes.func.isRequired,
  toggleNoteModal: PropTypes.func.isRequired,
  media: PropTypes.object.isRequired,
  isMine: PropTypes.bool,
  isFirstMedia: PropTypes.bool,
  authenticated: PropTypes.bool,
  toggleAuthModal: PropTypes.func.isRequired,
};

export default NotesBox;
