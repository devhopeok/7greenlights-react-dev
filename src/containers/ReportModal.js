import { connect } from 'react-redux';
import ReportModal from '../components/Media/ReportModal';
import { reportMedia, toggleReportModal } from '../actions/mediaActions';

const mapStateToProps = (state) => {
  return {
    isOpen: state.reportReducer.displayReportModal,
    reportError: state.reportReducer.reportError,
    done: state.reportReducer.done,
    mediaId: state.reportReducer.mediaId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reportMedia: (mediaId, report) => dispatch(reportMedia(mediaId, report)),
    toggleReportModal: () => dispatch(toggleReportModal()),
  };
};

const ReportModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportModal);

export default ReportModalContainer;
