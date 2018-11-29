import React, { PropTypes } from 'react';

const BlastField = ({ input, placeholder, type, meta: { touched, error } }) => {
  return (
    <div className="field-container">
      <input
        {...input}
        placeholder={placeholder}
        className="field-text blast-input"
        type={type}/>
      {
        touched && error &&
        <i className="error error-color">{error}</i>
      }
    </div>
  );
};

BlastField.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default BlastField;
