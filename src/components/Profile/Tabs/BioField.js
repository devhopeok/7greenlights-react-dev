import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const BioField = ({ updateUser, handleSubmit, fieldName, closeAction,
  resetForm }) => (
  <form
    onSubmit={handleSubmit(updateUser)}
    className="form"
  >
    <Field name={fieldName} component="textarea" />
    <div className="divider-line" />
    <div className="buttons-container">
      <button
        onClick={() => closeAction(resetForm)}
        className="transparent-button cancel-button"
        type="button"
      >
        Cancel
      </button>
      <button className="form-button">Save</button>
    </div>
  </form>
);

BioField.propTypes = {
  updateUser: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeAction: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
};

let FieldForm = reduxForm({
  form: 'edit-bio',
})(BioField);

FieldForm = connect(
  state => ({
    initialValues: state.loginReducer.user,
  }),
)(FieldForm);

export default FieldForm;
