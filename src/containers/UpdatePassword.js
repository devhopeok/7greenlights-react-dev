import { connect } from 'react-redux';
import UpdatePassword from '../components/UpdatePassword/UpdatePassword';
import * as passwordActions from '../actions/passwordsActions';

const mapStateToProps = (state) => {
  return {
    errorMessage: state.passwordReducer.updatePasswordError,
    passwordUpdated: state.passwordReducer.passwordUpdated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeEditPassword: () => {
      dispatch(passwordActions.initializeEditPassword());
    },
    submitUpdatePassword: (resetPasswordData) => {
      dispatch(passwordActions.updatePassword(resetPasswordData));
    }
  };
};

const UpdatePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePassword);

export default UpdatePasswordContainer;
