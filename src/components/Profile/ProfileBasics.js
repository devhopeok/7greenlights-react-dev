import React, { PropTypes, Component } from 'react';
import speakerIcon from '../Blast/img/green-speaker.png';
import UsernameForm from './UsernameForm';
import pencilIcon from './img/edit-pencil.png';
import Greenlight from '../Greenlight/Greenlight';
import profilePlaceholder from '../App/img/profile-ph.png';

class ProfileBasics extends Component {

  constructor() {
    super();
    this.state = {
      editMode: false,
      showPictureHover: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    const { editMode } = this.state;

    if (nextProps.user !== user && editMode) {
      this.toggleEditMode(editMode);
    }
  }

  toggleEditMode(editMode) {
    this.setState({
      editMode: !editMode,
    });
  }

  togglePictureHover(showPictureHover) {
    this.setState({
      showPictureHover: !showPictureHover,
    });
  }

  handlePicture(updateUserPicture) {
    // Submit picture
    let picFile = document.getElementById('pic-input').files[0];
    let formData = new FormData();
    formData.append('user[picture]', picFile);
    updateUserPicture(formData);
  }

  render() {
    const { user, isMine, updateUser, greenlightUser,
      updateUserPicture } = this.props;
    const { editMode, showPictureHover } = this.state;

    return (
      <div className="profile-basics">
        <input
          accept="image/gif, image/jpeg, image/png"
          hidden
          id="pic-input"
          type="file"
          name="picture"
          onChange={() => this.handlePicture(updateUserPicture)}
        />
        <img
          id="picture"
          src={user.picture ? user.picture : profilePlaceholder}
          className="profile-picture"
          onClick={() => {
            isMine && document.getElementById('pic-input').click();
          }}
          onMouseEnter={() => isMine && this.togglePictureHover(showPictureHover)}
          onMouseLeave={() => isMine && this.togglePictureHover(showPictureHover)}
        />
        {
          showPictureHover &&
          <div className="picture-hover" />
        }
        <div className="basic-info">
          <div className="username-form">
            {
              editMode ?
                <UsernameForm
                  user={user}
                  cancelEdit={() => this.toggleEditMode(editMode)}
                  updateUser={updateUser}
                /> :
                <h1>{user.username}</h1>
            }
            {
              (isMine && !editMode) &&
              <button
                type="button"
                onClick={() => this.toggleEditMode(editMode)}
              >
                <img className="pencil-icon" src={pencilIcon} />
              </button>
            }
            {
              !isMine &&
              <Greenlight
                greenlit={user.greenlit}
                counter={user.greenlights_received}
                greenlightAction={() => greenlightUser(user.id)}
                noPadding={true}
              />
            }
          </div>
          {
            user.last_blast &&
            <div className="last-blast">
              <img src={speakerIcon}/>
              <label>{`"${user.last_blast}"`}</label>
            </div>
          }
          <div className="link-list" />
        </div>
      </div>
    );
  }
}

ProfileBasics.propTypes = {
  user: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
  updateUser: PropTypes.func.isRequired,
  greenlightUser: PropTypes.func.isRequired,
  updateUserPicture: PropTypes.func.isRequired,
};

export default ProfileBasics;
