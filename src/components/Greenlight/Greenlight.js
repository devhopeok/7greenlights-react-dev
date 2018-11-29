import React, { PropTypes } from 'react';
import greenlightOffIcon from './img/greenlight-off.png';
import greenlightOnIcon from './img/greenlight-on.png';
import darkGreenlightIcon from './img/dark-gl.png';
import { connect } from 'react-redux';
import { toggleAuthModal } from '../../actions/commonActions';

let Greenlight = ({ counter, greenlit, greenlightAction, noPadding = false,
  dark = false, shouldDisplayCounter = true, authenticated,
  toggleAuthModal }) => {

  let clickAction = (e) => {
    e.stopPropagation();
    authenticated ? greenlightAction() : toggleAuthModal();
  };

  return (
    <div className={`greenlight-container ${noPadding && 'no-padding'}`}>
    <div className="lightbulb">
      <img
        src={greenlit ?
              greenlightOnIcon :
              (dark ? darkGreenlightIcon : greenlightOffIcon)
            }
        onClick={clickAction}
        className="pointer"
      /></div>
      {
        shouldDisplayCounter &&
        <label className={`greenlight-counter ${dark && 'dark'}`}>
          { counter }
        </label>
      }
    </div>
  );
};

Greenlight = connect(
  state => ({
    authenticated: state.loginReducer.authenticated,
  }),
  dispatch => ({
    toggleAuthModal: () => dispatch(toggleAuthModal()),
  }),
)(Greenlight);

Greenlight.propTypes = {
  counter: PropTypes.number,
  greenlit: PropTypes.bool,
  noPadding: PropTypes.bool,
  dark: PropTypes.bool,
  greenlightAction: PropTypes.func.isRequired,
  shouldDisplayCounter: PropTypes.bool,
  authenticated: PropTypes.bool,
  toggleAuthModal: PropTypes.func,
};

export default Greenlight;
