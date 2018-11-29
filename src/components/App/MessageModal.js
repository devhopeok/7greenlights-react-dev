import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import xIcon from './img/x-dark.png';
import { connect } from 'react-redux';
import { toggleMessageModal } from '../../actions/commonActions';
import { Loader } from 'react-loaders';

let MessageModal = ({ toggleMessageModal, message }) => {
  const isLoadingIndicator = message && message.loading;
  let emptyMessage = (!message.text && !message.title && !isLoadingIndicator) ||
                     message == {};
  const doNothing = () => {};

  return (
    <Modal
      isOpen={!emptyMessage}
      onRequestClose={!isLoadingIndicator ? toggleMessageModal : doNothing}
      className={`message-modal ${isLoadingIndicator && 'loading'}`}
      overlayClassName={`auth-popup-overlay ${isLoadingIndicator && 'loading'}`}
    >
      {
        isLoadingIndicator ?
        <Loader type="ball-scale-multiple" active /> :
        <div className="message-container">
          <button>
            <img src={xIcon} onClick={toggleMessageModal} />
          </button>
          <h1>{message.title}</h1>
          <p>{message.text}</p>
          <div className="divider-line" />
        </div>
      }
    </Modal>
  );
};

MessageModal.propTypes = {
  toggleMessageModal: PropTypes.func.isRequired,
  message: PropTypes.object,
};

MessageModal = connect(
  state => ({
    message: state.commonReducer.messageForModal,
  }),
  dispatch => ({
    toggleMessageModal: (message) => dispatch(toggleMessageModal(message)),
  }),
)(MessageModal);

export default MessageModal;
