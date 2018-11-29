import React, { PropTypes } from 'react';
import speakerIcon from '../../Blast/img/green-speaker.png';
import Greenlight from '../../Greenlight/Greenlight';
import { Link } from 'react-router';
import profilePlaceholder from '../../App/img/profile-ph.png';

const GreenlitUser = ({ user, greenlightUser }) => (
  <div className="greenlit-user-container">
    <div className="greenlit-user">
      <img
        className="profile-pic"
        src={user.picture || profilePlaceholder}
      />

      <div className="profile-data">
        <Link to={`/profile/${user.id}`}>{user.username}</Link>
        {
          user.last_blast &&
          <div className="last-blast">
            <img src={speakerIcon}/>
            <label>{`"${user.last_blast}"`}</label>
          </div>
        }
      </div>

      <Greenlight
        greenlit={user.greenlit}
        counter={user.greenlights_received}
        greenlightAction={() => greenlightUser(user.id)}
        noPadding={true}
      />
    </div>
    <div className="divider-line soft"/>
  </div>
);

GreenlitUser.propTypes = {
  user: PropTypes.object.isRequired,
  greenlightUser: PropTypes.func.isRequired,
};

export default GreenlitUser;
