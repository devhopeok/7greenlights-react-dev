import React, { PropTypes } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import LinkList from './LinkList';
import MediaField from './MediaField';
import Embedder from './Embedder';

const MediaForm = ({ handleSubmit, submitMedia, updateCurrentLink,
  currentWhereLink, mediaUrl, setMediaLink, toggleUploadMedia, isEdit,
  contentType, thumbnailUrl }) => (
  <form
    onSubmit={handleSubmit(
      (media) => {
        media['content_type'] = contentType;
        media['remote_image_url'] = thumbnailUrl;
        submitMedia(media);
      }
    )}
    className="form-container media-form"
    autoComplete="off"
  >
    <div className="fields-container">
      <Field
        name="name"
        component={MediaField}
        type="text"
        label="Content Title"
      />
      <Field name="media_url" component={MediaField} type="text"
        label="Media Link"
        onChangeAction={setMediaLink}
        isEdit={isEdit}
      />
      <Embedder mediaUrl={mediaUrl} />
      <label className="where-label">Download or Stream Link(s)</label>
    </div>
    <FieldArray name="links" component={LinkList}
      currentWhereLink={currentWhereLink}
      updateCurrentLink={updateCurrentLink}
    />
    <div className="line" />
    <div className="edit-media-buttons">
      <button
        type="button"
        onClick={toggleUploadMedia}
        className="cancel-button">
        Cancel
      </button>
      <button className="form-button confirm-button">
        {isEdit ? 'Update Media ' : 'Upload Media'}
      </button>
    </div>
  </form>
);

MediaForm.propTypes = {
  submitMedia: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateCurrentLink: PropTypes.func.isRequired,
  currentWhereLink: PropTypes.string,
  mediaUrl: PropTypes.string,
  setMediaLink: PropTypes.func,
  toggleUploadMedia: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  contentType: PropTypes.number,
  thumbnailUrl: PropTypes.string,
};

let MediaReduxForm = reduxForm({
  form: 'signup',
})(MediaForm);

MediaReduxForm = connect(
  state => ({
    initialValues: state.mediaReducer.editingMedia,
    contentType: state.mediaReducer.contentType,
    thumbnailUrl: state.mediaReducer.thumbnailUrl,
  }),
)(MediaReduxForm);

export default MediaReduxForm;
