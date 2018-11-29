import React, { PropTypes } from 'react';

const MediaField = ({ hidden, input, label, type, placeholder, onChangeAction, isEdit,
  meta: { touched, error } }) => {

  return (
    <div className="media-field" hidden={hidden}>
      <div>
        <label
          className={`field-title ${(touched && error) ? 'error-color' : ''}`}
        >
          {label}
        </label>
        {touched && error && <i className="field-error error-color">{error}</i>}
      </div>
      {
        isEdit ?
        <label className="edit-media-link">{input.value}</label> :
        <input {...input}
          placeholder={placeholder}
          type={type}
          onChange={(e) => {
            if (onChangeAction) {
              onChangeAction(e.target.value);
            }
            input.onChange(e);
          }}
        />
      }
    </div>
  );
};

MediaField.propTypes = {
  input: PropTypes.object.isRequired,
  onChangeAction: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default MediaField;
