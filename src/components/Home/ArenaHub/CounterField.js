import React, { PropTypes } from 'react';

const addLeadingZero = (number) => {
  return ('0' + number).slice(-2);
};

const CounterField = ({ label, value, version }) => {
  let inArenaPage = version == 'arena-page';
  let style = inArenaPage ? 'arena-page' : 'pointer';

  return (
    <div className={`counter-field ${inArenaPage && 'small-space'}`}>
      <label
        className={`counter-value ${style}`}>
          { addLeadingZero(value) }
        </label>
      <label className={`counter-label ${style}`}>{label}</label>
    </div>
  );
};

CounterField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  version: PropTypes.string,
};

export default CounterField;
