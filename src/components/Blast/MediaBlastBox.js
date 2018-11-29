import React, { PropTypes } from 'react';
import speakerIcon from './img/green-speaker.png';
import BlastForm from './BlastForm';
import { connect } from 'react-redux';
import { sendBlast } from '../../actions/blastActions';
import Tooltip from '../Tooltip/Tooltip';
import { tooltipIds } from '../../constants';

let MediaBlastBox = ( { postBlast, lastBlast } ) => (
  <div className="media-blast has-tooltip">
    <div className="blast-box">
      <img src={speakerIcon} />
      <h2>Add a Blast™</h2>
    </div>
    <BlastForm postBlast={postBlast} hasButton lastBlast={lastBlast} />
    <Tooltip tooltipId={tooltipIds.myMediaBlast} />
  </div>
);

MediaBlastBox.propTypes = {
  postBlast: PropTypes.func.isRequired,
  lastBlast: PropTypes.string,
};

MediaBlastBox = connect(
  () => ({}),
  (dispatch) => {
    return {
      postBlast: (text) => dispatch(sendBlast(text)),
    };
  }
)(MediaBlastBox);

export default MediaBlastBox;
