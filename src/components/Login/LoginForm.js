import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate as validateForm } from 'validate.js';
import FormField from './FormField';

const errorMessages = {
  email: 'Oops! this email is not valid',
  password: 'You must enter your password',
};

const loginDataConstraints = {
  email: {
    presence: { message: errorMessages.email },
    email: { message: errorMessages.email },
  },
  password: {
    presence: { message: errorMessages.password },
  },
};

const validate = values => {
  let errors = validateForm(values, loginDataConstraints, { fullMessages: false });
  return (errors ? errors : {});
};

class LoginForm extends Component {

  componentWillMount() {
    this.props.clearMessages();
  }

  render() {
    const { handleSubmit, submitLogin, toggleForms } = this.props;

    return (
      <form
        onSubmit={handleSubmit(submitLogin)}
        className="form-container"
      >
        <Field name="email" component={FormField} type="email" label="Email" />
        <Field name="password" component={FormField} type="password" label="Password" />
        <a className="text-center link-login-modal" onClick={toggleForms}>Forgot Password?</a>

        <button className="dark-button" type="submit">Sign In</button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submitLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleForms: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired
};

const LoginReduxForm = reduxForm({
  form: 'login',
  validate
})(LoginForm);

export default LoginReduxForm;
