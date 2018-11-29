import React, { PropTypes, Component } from 'react';
import Modal from 'react-modal';
import Greenlight from '../Greenlight/Greenlight';
import closeIcon from './img/x-dark.png';
import leftArrow from './img/left-arrow.png';
import { Link } from 'react-router';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

class NoteModal extends Component {

  constructor(props) {
    super();
    this.state = {
      index: props.index,
      maxIndex: props.media.featured_notes.length - 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      index: nextProps.index,
      maxIndex: nextProps.media.featured_notes.length - 1,
    });
  }

  switchNote(isLeft) {
    let nextIndex = isLeft ? (this.state.index - 1) : (this.state.index + 1);

    this.setState(
      { index: nextIndex }
    );
  }

  render() {
    const { isOpen, toggleNoteModal, media, greenlightNote } = this.props;
    const { index, maxIndex } = this.state;

    let note = media.featured_notes[index];
    let isMax = index === maxIndex;
    let isMin = index === 0;

    let backgroundImage = {
      backgroundImage: `url(${note.image})`,
    };

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => toggleNoteModal()}
        className="note-modal"
        overlayClassName="modal-overlay"
      >
        <button className="close-button" onClick={() => toggleNoteModal()}>
          <img src={closeIcon} />
        </button>
        <h1>{ media.name }</h1>
        <h2>by {media.author.username}</h2>
        <div className="slider-container">
          {
            (!isMin) &&
            <button
              onClick={() => this.switchNote(true)}
            >
              <img src={leftArrow} />
            </button>
          }
          <div className="note-image" style={backgroundImage}>
            <div className={note.greenlit ?
                'greenlit-gradient has-tooltip' :
                'dark-gradient has-tooltip'
            }>
              <Greenlight
                counter={note.greenlights_count}
                greenlightAction={() => greenlightNote(note.id)}
                greenlit={note.greenlit}
              />
              <Tooltip tooltipId={tooltipIds.notesGreenlight} />
            </div>
          </div>
          {
            (!isMax) &&
            <button
              onClick={() => this.switchNote(false)}
            >
              <img src={leftArrow} className="right-arrow" />
            </button>
          }
        </div>
        <span className="uploaded-by">
          Note™ uploaded by
          <Link to={`/profile/${note.author.id}`}>
            <u>{note.author.username}</u>
          </Link>
        </span>
      </Modal>
    );
  }
}

NoteModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleNoteModal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  media: PropTypes.object.isRequired,
  greenlightNote: PropTypes.func,
};

export default NoteModal;
