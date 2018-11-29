import React, { PropTypes } from 'react';

const NotesTab = () => {
  return (
    <div className="tab">
      <label className="coming-soon">Coming soon!</label>
    </div>
  );
};

NotesTab.propTypes = {
  user: PropTypes.object.isRequired,
};

export default NotesTab;
