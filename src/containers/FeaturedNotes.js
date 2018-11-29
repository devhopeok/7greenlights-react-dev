import { connect } from 'react-redux';
import FeaturedNotes from '../components/Notes/FeaturedNotes';
import { fetchNotes, featureNote, disregardNote,
  featureNotes } from '../actions/notesActions';

const mapStateToProps = ({ notesReducer }) => {
  return {
    featuredNotes: notesReducer.featuredNotes,
    disregardedNotes: notesReducer.disregardedNotes,
    allNotes: notesReducer.allNotes,
    mediaName: notesReducer.mediaName,
    currentPage: notesReducer.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotes: (mediaId, page) => dispatch(fetchNotes(mediaId, page)),
    featureNote: (note, position) => dispatch(featureNote(note, position)),
    disregardNote: (note) => dispatch(disregardNote(note)),
    featureNotes: (notes, disregardedNotes, mediaId) =>
      dispatch(featureNotes(notes, disregardedNotes, mediaId)),
  };
};

const FeaturedNotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedNotes);

export default FeaturedNotesContainer;
