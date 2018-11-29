import React, { PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { dndItemTypes } from '../../constants';

const slotTarget = {
  drop(props, monitor) {
    let note = monitor.getItem().note;
    props.featureNote(note, props.position);
  }
};

const collect = (connect) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

const FeaturedSlot = ({ featuredNote, disregardNote, connectDropTarget }) => {
  let noteImage = featuredNote && featuredNote.image;
  let greenlit = featuredNote && featuredNote.greenlit;
  let backgroundStyle = {
    backgroundImage: `url(${noteImage})`,
    border: 'none',
  };

  return connectDropTarget(featuredNote ?
    <div className="note" style={noteImage && backgroundStyle}>
      <div className={greenlit && 'greenlit-gradient'}>
        <button className="remove-icon" onClick={() => disregardNote()}>X</button>
      </div>
    </div> :
    <div className="note" />);
};

FeaturedSlot.propTypes = {
  featuredNote: PropTypes.object,
  featureNote: PropTypes.func.isRequired,
  disregardNote: PropTypes.func.isRequired,
};

export default DropTarget(dndItemTypes.NOTE, slotTarget, collect)(FeaturedSlot);
