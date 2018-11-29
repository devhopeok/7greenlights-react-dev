import React, { PropTypes } from 'react';

const FormField = ({ input, label, type, placeholder, paddingLeft0,
  paddingRight0, meta: { touched, error }, pattern, onBlur }) => {

  return (
    <div
      className={`
        field-container
        ${ paddingLeft0 ? 'padding-left-0' : ''}
        ${ paddingRight0 ? 'padding-right-0' : ''}
      `}
    >
      <div className="field-title-container">
        <label
          className={`field-title ${(touched && error) ? 'error-color' : ''}`}
        >
          {label}
        </label>
        {touched && error && <i className="field-error error-color">{error}</i>}
      </div>
      <input
        {...input}
        placeholder={placeholder}
        className="field-text"
        type={type}
        pattern={pattern}
        onBlur={onBlur && (value => input.onBlur(onBlur(value)))}
      />
      <div className={`field-bottom-line ${(touched && error) ? 'background-error' : ''}`}/>
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  paddingRight0: PropTypes.bool,
  paddingLeft0: PropTypes.bool,
  pattern: PropTypes.string,
  onBlur: PropTypes.func,
};

export default FormField;
