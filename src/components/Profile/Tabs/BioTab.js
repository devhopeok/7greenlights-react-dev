import React, { PropTypes, Component } from 'react';
import BioField from './BioField';

class BioTab extends Component {
  constructor() {
    super();
    this.state = {
      editingBio: false,
      editingGoals: false,
    };
  }

  toggleBioEdit(editingBio, editingGoals, resetForm) {
    editingGoals = (!editingBio && editingGoals) ? false : editingGoals;
    this.setState({ editingBio: !editingBio, editingGoals: editingGoals });
    if (editingBio && resetForm) {
      resetForm();
    }
  }

  toggleGoalsEdit(editingGoals, editingBio, resetForm) {
    editingBio = (!editingGoals && editingBio) ? false : editingBio;
    this.setState({ editingGoals: !editingGoals, editingBio: editingBio });
    if (editingGoals && resetForm) {
      resetForm();
    }
  }

  render() {
    const { user, isMine, updateUser } = this.props;
    const { editingBio, editingGoals } = this.state;

    return (
      <div className="tab bio">
        <div className="title-container">
          <h2>About {user.username}</h2>
          {
            isMine &&
            <button
              className="edit-pencil"
              onClick={(resetForm) =>
                this.toggleBioEdit(editingBio, editingGoals, resetForm)
              }
            />
          }
        </div>
        {
          editingBio &&
          <BioField
            fieldName="about"
            closeAction={(resetForm) =>
              this.toggleBioEdit(editingBio, editingGoals, resetForm)
            }
            updateUser={
              (data) => {
                this.toggleBioEdit(editingBio, editingGoals);
                updateUser(data);
              }
            }
          />
        }
        { (!editingBio) &&
          (user.about ?
          <p>{user.about}</p> :
          <i className="placeholder">Tell your fans a little about you</i>)
        }
        <div className="divider-line soft"/>
        <div className="title-container">
          <h2>Goals</h2>
          {
            isMine &&
            <button
              className="edit-pencil"
              onClick={(resetForm) =>
                this.toggleGoalsEdit(editingGoals, editingBio, resetForm)
              }
            />
          }
        </div>
        {
          editingGoals &&
          <BioField
            fieldName="goals"
            closeAction={(resetForm) =>
              this.toggleGoalsEdit(editingGoals, editingBio, resetForm)
            }
            updateUser={
              (data) => {
                this.toggleGoalsEdit(editingGoals, editingBio);
                updateUser(data);
              }
            }
          />
        }
        {
          (!editingGoals) &&
          (user.goals ?
          <p>{user.goals}</p> :
          <i className="placeholder">What are your main goals?</i>)
        }
        <div className="divider-line" />
      </div>
    );
  }
}

BioTab.propTypes = {
  user: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default BioTab;
