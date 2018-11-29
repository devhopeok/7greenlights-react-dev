import React from 'react';
import mainLogo from '../img/main-logo.png';

const LogoBox = () => {
  return (
    <div className="logo-box">
      <img src={mainLogo} className="main-logo" />
    </div>
  );
};

export default LogoBox;
