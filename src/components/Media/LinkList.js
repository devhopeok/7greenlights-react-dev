import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import LinkField from './LinkField';
import xIcon from './img/x.png';
import linkIcon from './img/link-icon.png';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

const LinkList = ({ fields, currentWhereLink, updateCurrentLink }) => (
  <div>
    <div className="fields-container add-link-container has-tooltip">
      <input
        onChange={(event) => updateCurrentLink(event.target.value)}
        type="text"
        value={currentWhereLink}
      />
      <button
        type="button"
        className="transparent-button"
        onClick={() => {
          if (currentWhereLink) {
            fields.push({ url: currentWhereLink });
            updateCurrentLink('');
          }
        }}
      >
        Add
      </button>
      <Tooltip tooltipId={tooltipIds.myMediaExternalLinks} />
    </div>

    <div className="links-list">
      {fields.map((links, index) =>
        <div key={index} className="link">
          <img src={linkIcon} />
          <Field name={`${links}.url`} type="text" component={LinkField} />
          <button
            className="crossIcon"
            style={{ backgroundImage: `url(${xIcon})` }}
            type="button"
            onClick={() => fields.remove(index)}
          />
        </div>
      )}
    </div>
  </div>
);

LinkList.propTypes = {
  updateCurrentLink: PropTypes.func.isRequired,
  fields: PropTypes.object,
  currentWhereLink: PropTypes.string,
};

export default LinkList;
