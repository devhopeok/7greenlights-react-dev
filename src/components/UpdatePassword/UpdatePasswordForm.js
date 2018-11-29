import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormField from './FormField';
import { validate as validateForm } from 'validate.js';
import * as constants from '../../constants';

const errorMessages = {
  password: 'The password must be ' + constants.MIN_PASSWORD_LENGTH + ' characters long',
  password_confirmation: 'Passwords don\'t match'
};

const updatePasswordDataConstraints = {
  password: {
    presence: { message: errorMessages.password },
  },
  password_confirmation: {
    presence: { message: errorMessages.password },
    equality: {
      attribute: 'password',
      message: errorMessages.password_confirmation,
    },
  },
};

const validate = values => {
  let errors = validateForm(values, updatePasswordDataConstraints, { fullMessages: false });
  return errors || {};
};

const UpdatePasswordForm = ({ handleSubmit, submitUpdatePassword, params }) => {

  let onSubmit = (values) => {
    values['reset_password_token'] = params.passwordToken;
    submitUpdatePassword(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-container"
      autoComplete="off"
    >
        <Field
          name="password"
          component={FormField}
          type="password"
          label="New Password*" />
        <Field
          name="password_confirmation"
          component={FormField}
          type="password"
          label="Confirm Password*"
        />
      <button className="form-button" type="submit">Save</button>
    </form>
  );
};

UpdatePasswordForm.propTypes = {
  submitUpdatePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  params: PropTypes.object
};

let UpdatePasswordReduxForm = reduxForm({
  form: 'updatePassword',
  validate
})(UpdatePasswordForm);

export default UpdatePasswordReduxForm;
