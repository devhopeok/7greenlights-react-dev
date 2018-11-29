import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

let ReportForm = ({ handleSubmit, reportMedia }) => {
  let reportMediaWrapper = (data) => {
    if (!data.message || data.message.length === 0) {
      alert('Please, explain why you want to report this media');
    } else {
      reportMedia(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(reportMediaWrapper)}
      className="report-form"
    >
      <Field className="report-text" component="textarea" name="message" />
      <button className="dark-button">Send</button>
    </form>
  );
};

ReportForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reportMedia: PropTypes.func.isRequired,
};

ReportForm = reduxForm({
  form: 'report-media',
})(ReportForm);

export default ReportForm;
