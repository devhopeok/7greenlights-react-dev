import React, { PropTypes } from 'react';
import GreenlitUser from './GreenlitUser';

const GreenlitPeopleTab = ({ greenlightUser, greenlitPeople }) => {
  return (
    <div className="tab">
      {
        greenlitPeople.map((user, index) =>
          <GreenlitUser
            key={index}
            user={user}
            greenlightUser={greenlightUser}
          />
        )
      }
    </div>
  );
};

GreenlitPeopleTab.propTypes = {
  greenlightUser: PropTypes.func.isRequired,
  greenlitPeople: PropTypes.array,
};

export default GreenlitPeopleTab;
