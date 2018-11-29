import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import tickedIcon from '../FilterSort/Medias/img/ticked.png';
import untickedIcon from '../FilterSort/Medias/img/unticked.png';

const TermsCheck = ({ agreedTerms, toggleAgreedTerms }) => {

  return (
    <div className="agreement-notice">
      <button type="button" onClick={toggleAgreedTerms}>
        <img src={agreedTerms ? tickedIcon : untickedIcon} />
      </button>
      <span>
        I agree to the
        <Link to="/about#legal"> <u>Terms of Use</u> </Link>
        and
        <Link to ="/about#legal"> <u>Privacy Policy</u> </Link>
      </span>
    </div>
  );
};

TermsCheck.propTypes = {
  agreedTerms: PropTypes.bool,
  toggleAgreedTerms: PropTypes.func.isRequired,
};

export default TermsCheck;
