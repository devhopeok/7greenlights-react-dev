import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTooltipOnPage } from 'actions/commonActions';
import { tooltipArray } from 'constants';

const isInPage = (tooltip) => {
  const currentPath = window.location.pathname;
  let isInPage = false;
  if ('page' in tooltip) {
    let matches = currentPath.match(tooltip.page);
    isInPage = matches && matches.length !== 0;
  }
  return isInPage;
};

const isFirstNotSeen = (tooltip, showTooltips) => {
  const order = tooltip.order;
  const forThisPage = tooltipArray.filter(tooltip => isInPage(tooltip));
  const lowerOrderThanMe =
    forThisPage.filter(tooltip =>
      ((tooltip.order < order) && !showTooltips[tooltip.id]));

  return !lowerOrderThanMe.length;
};

let Tooltip = ({ tooltipId, showTooltips, authenticated, toggleTooltipOnPage }) => {
  const tooltip = tooltipArray.find(tooltip => tooltip.id == tooltipId);
  let shouldBeDisplayed =
    isFirstNotSeen(tooltip, showTooltips) &&
    isInPage(tooltip) &&
    authenticated &&
    !showTooltips[tooltip.id];

  if (!shouldBeDisplayed) {
    return null;
  }

  return (
    <div className={`tooltip ${tooltip.classname}`}>
      <p className="tooltip-text">{tooltip.text}</p>
      <button
        type="button"
        className="dark-button"
        onClick={(event) => toggleTooltipOnPage(event, tooltip.id, showTooltips)}
      >
        Got it!
      </button>
    </div>
  );
};

Tooltip.propTypes = {
  tooltipId: PropTypes.string.isRequired,
  showTooltips: PropTypes.object.isRequired,
  authenticated: PropTypes.bool,
  toggleTooltipOnPage: PropTypes.func.isRequired,
};

Tooltip = connect(
  state => ({
    showTooltips: state.commonReducer.showTooltips,
    authenticated: state.loginReducer.authenticated,
  }),
  dispatch => ({
    toggleTooltipOnPage:
    (event, id, showTooltips) => {
      event.stopPropagation();
      dispatch(toggleTooltipOnPage(id, showTooltips));
    }
  }),
)(Tooltip);

export default Tooltip;
