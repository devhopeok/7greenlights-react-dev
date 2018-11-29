import React, { PropTypes } from 'react';
import MediaForm from './MediaForm';

const EditMedia = ({ mode, uploadMedia, updateCurrentLink,
  currentWhereLink, mediaUrl, setMediaLink, toggleUploadMedia }) => {

  let isEdit = (mode === 'edit');
  return (
    <div className="edit-media">
      <h1>{isEdit ? 'Edit Media' : 'Upload Media'}</h1>
      <MediaForm
        submitMedia={uploadMedia}
        updateCurrentLink={updateCurrentLink}
        currentWhereLink={currentWhereLink}
        mediaUrl={mediaUrl}
        setMediaLink={setMediaLink}
        toggleUploadMedia={toggleUploadMedia}
        isEdit={isEdit}
      />
    </div>
  );
};

EditMedia.propTypes = {
  mode: PropTypes.oneOf(['edit', 'upload']).isRequired,
  uploadMedia: PropTypes.func.isRequired,
  updateCurrentLink: PropTypes.func.isRequired,
  currentWhereLink: PropTypes.string,
  mediaUrl: PropTypes.string,
  setMediaLink: PropTypes.func.isRequired,
  toggleUploadMedia: PropTypes.func.isRequired,
};

export default EditMedia;
