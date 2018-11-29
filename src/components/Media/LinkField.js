import React, { PropTypes } from 'react';

const LinkField = ({ input, type }) => (
  <input {...input} type={type} readOnly />
);

LinkField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default LinkField;
