import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import BlastField from './BlastField';
import { MAX_BLAST_LENGTH } from 'constants';
import { validate as validateForm } from 'validate.js';

const blastConstraints = {
  text: {
    length: {
      maximum: MAX_BLAST_LENGTH,
      message: `The maximum amount of characters is ${MAX_BLAST_LENGTH}`,
    },
  },
};

const validate = values => {
  let errors = validateForm(values, blastConstraints, { fullMessages: false });
  return (errors ? errors : {});
};

let BlastForm = ( { handleSubmit, postBlast, hasButton, resetBlastForm,
  lastBlast } ) => {

  const submitBlast = data => postBlast(data).then(resetBlastForm());
  const placeholder =
    lastBlast || `post a Blast™ here (max ${MAX_BLAST_LENGTH} chars)`;

  return (
    <form
      onSubmit={handleSubmit(submitBlast)}
      className="blast-form"
    >
      <Field
        name="text"
        component={BlastField}
        type="text"
        placeholder={placeholder}
      />
      { hasButton &&
        <button className="transparent-button">Post</button>
      }
    </form>
  );
};

BlastForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postBlast: PropTypes.func.isRequired,
  resetBlastForm: PropTypes.func,
  hasButton: PropTypes.bool,
  lastBlast: PropTypes.string,
};

BlastForm = reduxForm({
  form: 'blast',
  touchOnBlur: false,
  validate
})(BlastForm);

export default BlastForm;
