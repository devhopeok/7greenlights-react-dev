import React, { PropTypes } from 'react';

const FormField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="field-container">
      <div className="field-title-container">
        <label className={`field-title dark-color strong ${(touched && error) ? 'error-color' : ''}`}>{label}</label>
        {touched && error && <i className="field-error strong error-color">{error}</i>}
      </div>
      <input {...input} className="field-text" type={type}/>
      <div className={`field-bottom-line dark-background ${(touched && error) ? 'background-error' : ''}`}/>
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

export default FormField;
