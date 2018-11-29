import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate as validateForm } from 'validate.js';
import FormField from './FormField';

const errorMessages = {
  email: 'Oops! this email is not valid'
};

const forgotPasswordDataConstraints = {
  email: {
    presence: { message: errorMessages.email },
    email: { message: errorMessages.email },
  }
};

const validate = values => {
  let errors = validateForm(values, forgotPasswordDataConstraints, { fullMessages: false });
  return errors || {};
};

class ForgotPasswordForm extends Component {

  componentWillMount() {
    this.props.clearMessages();
  }

  render() {
    const {
      handleSubmit,
      submitForgotPassword,
      successMessage,
      errorMessage,
      toggleForms
    } = this.props;

    let message = successMessage || errorMessage;

    return (
      <div className="forgot-password-container">
        <div className="text-login-modal">
          Enter your email and we will send you the instructions to reset your password
        </div>
        <form
          onSubmit={handleSubmit(submitForgotPassword)}
          className="form-container form-container-password"
        >
          <Field name="email" component={FormField} type="email" label="Email" />
          {
            message &&
            <div className="text-login-modal message">
              {message}
            </div>
          }
          <button className="dark-button" type="submit">Send</button>
          <a className="link-login-modal" onClick={toggleForms}>Sign In</a>
        </form>
      </div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submitForgotPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleForms: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string
};

const ForgotPasswordReduxForm = reduxForm({
  form: 'forgotPassword',
  validate
})(ForgotPasswordForm);

export default ForgotPasswordReduxForm;
