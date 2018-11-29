import React, { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu';
import { connect } from 'react-redux';
import { logout } from 'actions/logoutActions';
import profilePicPlaceholder from 'components/App/img/profile-ph.png';

let BurgerMenu = class BurgerMenu extends Component {
  render() {
    const { logout, user } = this.props;
    return (
      <Menu
        right
        styles={overridingStyles}
        customCrossIcon={false}
      >
        <a
          className="menu-item user-container"
          href={`/profile/${user.id}`}
          style={overridingStyles.flexContainer}
        >
          <img
            src={user.picture || profilePicPlaceholder}
            className="profile-picture"
          />
          <span>{user.username}</span>
        </a>
        <div className="links" style={overridingStyles.flexContainer}>
          <a className="menu-item" href="/">Venues™</a>
          <a className="menu-item" href="/mymedia">My Media</a>
          <a className="menu-item" href="/mystream">My Stream</a>
          <a className="menu-item" href="/about">Help</a>
          <button className="menu-item logout" onClick={logout}>Log Out</button>
        </div>
      </Menu>
    );
  }
};

BurgerMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

BurgerMenu = connect(
  (state) => ({ user: state.loginReducer.user }),
  (dispatch) => ({ logout: () => dispatch(logout()) }),
)(BurgerMenu);

// using javascript with this styles so they're inline. I need them to be inline
// or else the library will use their inline styles, thus overriding mines
const overridingStyles = {
  bmBurgerButton: {
    zIndex: 1000,
  },
  bmMenuWrap: {
    zIndex: 1200,
    width: '25rem',
  },
  bmMenu: {
    overflow: 'hidden',
  },
  flexContainer: {
    display: 'flex',
  },
};

export default reduxBurgerMenu(BurgerMenu);
