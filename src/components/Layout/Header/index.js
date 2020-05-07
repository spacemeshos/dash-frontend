import React from 'react';

import darkLogo from '../../../assets/logo-icon.svg';

const Header = () => (

  <header className="site-header">
    <div className="link-header" href="/">
      <div>
        <img className="logo-img" src={darkLogo} alt="spacemesh" />
      </div>
      <div className="logo-text">spacemesh</div>
    </div>
    <nav className="navbar">
      <ul className="navbar__list menu">
        <li className="navbar__list-item">
          <a className="navbar__link" href="/download_wallet/">download wallet</a>
        </li>
        <li className="navbar__list-item">
          <a className="navbar__link" href="https://spacemesh.io">spacemesh home</a>
        </li>
      </ul>
    </nav>

  </header>
);

export default Header;
