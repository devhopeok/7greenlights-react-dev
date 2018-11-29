import { connect } from 'react-redux';
import About from '../components/About/About';
import { switchTab } from '../actions/aboutActions';

const mapStateToProps = (state) => {
  return {
    selectedTab: state.aboutReducer.selectedTab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (newTab) => dispatch(switchTab(newTab)),
  };
};

const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);

export default AboutContainer;
