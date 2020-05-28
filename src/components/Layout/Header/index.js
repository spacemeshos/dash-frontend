// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import darkLogo from '../../../assets/logo-icon.svg';
import Switcher from '../../atoms/Switcher';


const Header = () => {
  const [checked, setChecked] = useState(false);

  const switchTheme = (e) => {
    setChecked(e.target.checked);
    const color = checked ? 'light' : 'dark';
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${color}`);
  };

  return (
    <header className="header d-flex align-items-center flex-wrap">
      <Link to="/" className="header-link d-flex align-items-center ">
        <img className="header-link__logo" src={darkLogo} alt="spacemesh" />
        <div className="header-link__logo-text">spacemesh</div>
      </Link>
      <nav className="navbar d-flex flex-wrap">
        <ul className="navbar__list d-flex menu">
          <li className="navbar__list-item">
            <a className="navbar__link" href="/download_wallet/">download wallet</a>
          </li>
          <li className="navbar__list-item">
            <a className="navbar__link" href="https://spacemesh.io">spacemesh home</a>
          </li>
        </ul>
      </nav>
      <Switcher id="switch" onChange={switchTheme} checked={checked} />
    </header>
  );
}

export default Header;
