import React from 'react';

import darkLogo from '../../../assets/logo-invert.svg';

const Header = () => (

  <header className="site-header">
    <a className="link-header" href="/">
      <img className="logo-img" src={darkLogo} alt="spacemesh" />
    </a>
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
