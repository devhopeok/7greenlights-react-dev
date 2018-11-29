import React, { PropTypes } from 'react';
import LogoBox from './LogoBox';
import SignupBox from './SignupBox';
import BlastBox from '../../Blast/BlastBox';

const TopBanner = ({ fbLoginSuccess, igLoginSuccess, igLoginFailure,
    location, authenticated }) => {

  return (
    <div className={`top-banner-container ${ authenticated && 'reduced' }`}>
      { authenticated && <div className="dark-bg" /> }
      <div className={`top-banner ${ authenticated && 'reduced' }`}>
        <div className="top-bar-placeholder" />
        { !authenticated && <LogoBox /> }
        { !authenticated &&
          <SignupBox
            fbLoginSuccess={fbLoginSuccess}
            igLoginSuccess={igLoginSuccess}
            igLoginFailure={igLoginFailure}
            location={location}
          />
        }
        { authenticated &&
          <div className="blast-banner">
            <BlastBox inHomepage />
          </div>
        }
      </div>
    </div>
  );
};

TopBanner.propTypes = {
  fbLoginSuccess: PropTypes.func.isRequired,
  igLoginSuccess: PropTypes.func.isRequired,
  igLoginFailure: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default TopBanner;
