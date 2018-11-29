import React, { PropTypes } from 'react';
import speakerIcon from './img/speaker.png';
import greenSpeakerIcon from './img/green-speaker.png';
import BlastForm from './BlastForm';
import MediaBlastBox from './MediaBlastBox';
import { connect } from 'react-redux';
import { sendBlast } from '../../actions/blastActions';
import { reset } from 'redux-form';
import Tooltip from '../Tooltip/Tooltip';
import { tooltipIds } from '../../constants';

let BlastBox = ( { postBlast, mediaVersion, resetBlastForm, lastBlast,
  inHomepage } ) => (
    mediaVersion ?
    <MediaBlastBox postBlast={postBlast} lastBlast={lastBlast} /> :
    <div className="blast-box">
      <img src={mediaVersion ? speakerIcon : greenSpeakerIcon} />
      <BlastForm
        lastBlast={lastBlast}
        postBlast={postBlast}
        resetBlastForm={resetBlastForm}
      />
      {
        inHomepage &&
        <Tooltip tooltipId={tooltipIds.homeBlast} />
      }
    </div>
);

BlastBox.propTypes = {
  postBlast: PropTypes.func.isRequired,
  mediaVersion: PropTypes.bool,
  resetBlastForm: PropTypes.func,
  lastBlast: PropTypes.string,
  inHomepage: PropTypes.bool,
};

BlastBox = connect(
  (state) => ({
    lastBlast: state.loginReducer.user ? state.loginReducer.user.last_blast : '',
  }),
  (dispatch) => {
    return {
      postBlast: (text) => dispatch(sendBlast(text)),
      resetBlastForm: () => dispatch(reset('blast')),
    };
  }
)(BlastBox);

export default BlastBox;
