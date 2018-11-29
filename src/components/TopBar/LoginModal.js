import React, { PropTypes, Component } from 'react';
import LoginContainer from '../../containers/Login';
import onClickOutside from 'react-onclickoutside';

class LoginModal extends Component {

  handleClickOutside() {
    const { onRequestClose } = this.props;
    onRequestClose();
  }

  render() {
    return (
      <div className="login-bubble">
        <LoginContainer />
      </div>
    );
  }
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default onClickOutside(LoginModal);
