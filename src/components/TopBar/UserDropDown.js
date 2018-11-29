import React, { PropTypes } from 'react';
import Modal from 'react-modal';

const UserDropDown = ({ isOpen, onRequestClose, logout }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="dropdown-bubble"
    overlayClassName="modal-overlay"
  >
    <div className="user-dropdown">
      <button onClick={logout}>Log out</button>
    </div>
  </Modal>
);

UserDropDown.propTypes = {
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default UserDropDown;
