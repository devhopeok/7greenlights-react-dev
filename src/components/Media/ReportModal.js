import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import ReportForm from './ReportForm';
import closeButton from './img/x-dark.png';

class ReportModal extends Component {
  render() {

    const { isOpen, mediaId, toggleReportModal, reportMedia, done,
      reportError } = this.props;

    let message = 'Why would you like to report this content?';
    if (done && reportError) {
      message =
        'Sorry, there was an error while sending your report, please try again.';
    } else if (done) {
      message = 'Your report has been successfully sent. Thank you!';
    }

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleReportModal()}
        className="report-modal"
        overlayClassName="modal-overlay"
      >
        <button className="close-button" onClick={() => toggleReportModal()}>
          <img src={closeButton} />
        </button>
        <h1>{ message }</h1>
        <div className="divider-line" />
        {
          (!done) &&
          <ReportForm reportMedia={(report) => reportMedia(mediaId, report)} />
        }
      </Modal>
    );
  }
}

ReportModal.propTypes = {
  isOpen: PropTypes.bool,
  mediaId: PropTypes.number,
  toggleReportModal: PropTypes.func.isRequired,
  reportMedia: PropTypes.func.isRequired,
  done: PropTypes.bool,
  reportError: PropTypes.bool,
};

export default ReportModal;
