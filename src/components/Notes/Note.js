import React, { PropTypes } from 'react';
import { dndItemTypes } from '../../constants';
import { DragSource } from 'react-dnd';

const noteSource = {
  beginDrag(props) {
    return { note: props.note };
  }
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const Note = ({ note, featureNote, connectDragSource }) => {
  let image = note.image;
  let backgroundStyle = {
    backgroundImage: `url(${image})`,
    borderColor: 'transparent',
  };

  return connectDragSource(
    <button
      style={image && backgroundStyle}
      className="note greenlit-gradient"
      onClick={featureNote}
    >
      <div className={note.greenlit && 'greenlit-gradient'}>
        <div className="note-overlay" />
      </div>
    </button>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  featureNote: PropTypes.func.isRequired,
};

export default DragSource(dndItemTypes.NOTE, noteSource, collect)(Note);
