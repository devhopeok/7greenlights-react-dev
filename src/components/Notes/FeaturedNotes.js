import React, { PropTypes, Component } from 'react';
import Note from './Note';
import FeaturedSlot from './FeaturedSlot';
import { Link } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

class FeaturedNotes extends Component {

  componentWillMount() {
    const { params, fetchNotes, currentPage } = this.props;
    fetchNotes(params.mediaId, currentPage);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchNextPage);
  }

  fetchNextPage = () => {
    const { fetchNotes, currentPage, params } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      fetchNotes(params.mediaId, currentPage);
    }
  }

  render() {
    const { allNotes, featuredNotes, mediaName, featureNote,
      disregardNote, featureNotes, params, disregardedNotes } = this.props;

    let slots = [];
    for (let i = 0; i < 7; i++) {
      let note = featuredNotes[i];
      slots.push(
        <FeaturedSlot
          key={i}
          position={i}
          disregardNote={() => disregardNote(note)}
          featureNote={(note, position) => featureNote(note, position)}
          featuredNote={note}
        />);
    }

    return (
      <div className="full-page outerspace-bg">
        <div className="mynotes-container">
          <div className="top-section">
            <div className="title-container has-tooltip">
              <h1>{`Notes™ for ${mediaName}`}</h1>
              <Tooltip tooltipId={tooltipIds.featuredNotes} />
            </div>
            <div className="featured-notes">
              { slots }
            </div>

            <div className="notes-actions">
              <Link to="/mymedia" className="back-media">Back to My Media</Link>
              <button
                className="form-button"
                onClick={() =>
                  featureNotes(featuredNotes, disregardedNotes, params.mediaId)}
              >
                Done
              </button>
            </div>
          </div>
          <div className="user-notes">
            { allNotes.map(note => (
                <Note
                  key={note.id}
                  note={note}
                  featureNote={() => featureNote(note)}
                />
            ))}

            { allNotes.length === 0 &&
              <h2 className="no-notes">No more Notes™ submitted to this media</h2>
            }

            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
            <div className="dummy" />
          </div>
        </div>
      </div>
    );
  }
}

FeaturedNotes.propTypes = {
  allNotes: PropTypes.array,
  featuredNotes: PropTypes.array,
  disregardedNotes: PropTypes.array,
  params: PropTypes.object.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  mediaName: PropTypes.string.isRequired,
  featureNote: PropTypes.func.isRequired,
  featureNotes: PropTypes.func.isRequired,
  disregardNote: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default DragDropContext(HTML5Backend)(FeaturedNotes);
