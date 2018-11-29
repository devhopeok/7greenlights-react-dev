import React, { PropTypes } from 'react';

const TabHeader = ({ id, name, selectedTab, switchTab }) => {
  let selected = id === selectedTab;

  return (
    <button
      onClick={() => switchTab(id)}
      type="button"
      className="profile-tab-header"
    >
      <h2 className={selected && 'selected'}>{name}</h2>
      { selected }
    </button>
  );
};

TabHeader.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
};

export default TabHeader;
