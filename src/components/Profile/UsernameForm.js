import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import tickIcon from './img/tick-icon.png';
import cancelIcon from './img/cancel-x.png';

let UsernameForm = ({ handleSubmit, updateUser, cancelEdit, error }) => {
  return (
    <form
      className="username-form"
      onSubmit={handleSubmit(updateUser)}
    >
      <div className="username-field">
        <Field component="input" name="username" />
        <div className="divider-line" />
        { error && <label className="field-error error-color">{error}</label>}
      </div>
      <button><img className="tick-icon" src={tickIcon} /></button>
      <button type="button" onClick={cancelEdit}>
        <img className="cancel-icon" src={cancelIcon} />
      </button>
    </form>
  );
};

UsernameForm.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

UsernameForm = reduxForm({
  form: 'edit-username',
})(UsernameForm);

UsernameForm = connect(
  state => ({
    initialValues: state.loginReducer.user,
  }),
)(UsernameForm);

export default UsernameForm;

