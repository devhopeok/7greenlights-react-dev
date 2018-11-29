import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import FormField from './FormField';
import { validate as validateForm } from 'validate.js';
import * as constants from '../../constants';
import TermsCheck from './TermsCheck';

const errorMessages = {
  email: 'Oops! this email is not valid',
  username: 'You forgot to put your name!',
  password: 'The password must be ' + constants.MIN_PASSWORD_LENGTH + ' characters long',
  password_confirmation: 'Passwords don\'t match',
};

const signupDataConstraints = {
  email: {
    presence: { message: errorMessages.email },
    email: { message: errorMessages.email },
  },
  username: {
    presence: { message: errorMessages.username },
  },
  password: {
    presence: { message: errorMessages.password },
    length: {
      minimum: constants.MIN_PASSWORD_LENGTH,
      tooShort: errorMessages.password,
    },
  },
  password_confirmation: {
    presence: { message: errorMessages.password_confirmation },
    equality: {
      attribute: 'password',
      message: errorMessages.password_confirmation,
    },
  },
};

const validate = values => {
  let errors = validateForm(values, signupDataConstraints, { fullMessages: false });
  return (errors ? errors : {});
};

const twoDigit = (e) => (e.target.value.length < 2) ?
                        ('0' + e.target.value) :
                        e.target.value;

class SignupForm extends Component {
  constructor() {
    super();
    this.state = { agreedTerms: false };
  }

  toggleAgreedTerms() {
    this.setState({ agreedTerms: !this.state.agreedTerms });
  }

  render() {
    const { handleSubmit, submitSignup, socialNetwork } = this.props;
    const { agreedTerms } = this.state;
    return (
      <form
        onSubmit={handleSubmit(submitSignup)}
        className="form-container"
        autoComplete="off"
      >
        <Field name="username" component={FormField} type="text" label="Username"/>
        <div className="field-container">
          <label className="field-title">Date of Birth</label>
          <div className="dob-fields-container">
            <Field
              name="dob_month"
              component={FormField}
              type="text"
              placeholder="MM"
              pattern="\d*"
              onBlur={twoDigit}
              paddingLeft0
            />
            <Field
              name="dob_day"
              component={FormField}
              type="text"
              placeholder="DD"
              pattern="\d*"
              onBlur={twoDigit}
            />
            <Field
              name="dob_year"
              component={FormField}
              type="text"
              placeholder="YYYY"
              pattern="\d*"
              onBlur={twoDigit}
              paddingRight0
            />
          </div>
        </div>
        <Field name="email" component={FormField} type="email" label="Email*" />
        { (!socialNetwork) &&
          <Field
            name="password"
            component={FormField}
            type="password"
            label="Password*" />
        }
        { (!socialNetwork) &&
          <Field
            name="password_confirmation"
            component={FormField}
            type="password"
            label="Confirm Password*"
          />
        }
        <TermsCheck
          agreedTerms={agreedTerms}
          toggleAgreedTerms={this.toggleAgreedTerms.bind(this)}
        />
        <button
          disabled={!agreedTerms}
          className={`form-button ${!agreedTerms && 'disabled'}`}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    );
  }
}

SignupForm.propTypes = {
  submitSignup: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  socialNetwork: PropTypes.string,
};

let SignupReduxForm = reduxForm({
  form: 'signup',
  validate
})(SignupForm);

SignupReduxForm = connect(
  state => ({
    initialValues: state.signupReducer.newUserData
  }),
)(SignupReduxForm);

export default SignupReduxForm;
