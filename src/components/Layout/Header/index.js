// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import Switcher from '../../atoms/Switcher';

type Props = {
  checkedTheme: string,
  switchTheme: Function,
}

const Header = (props: Props) => {
  const { checkedTheme, switchTheme } = props;

  return (
    <header className="header d-flex align-items-center flex-wrap">
      <Link to="/" className="header-link d-flex align-items-center ">
        <svg className="header-link__logo" width="5" height="10" viewBox="0 0 5 10" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.0739746 0.728532L0.36501 0.0396729L4.44805 0.0396729L4.73909 0.728532L2.97265 2.54544L4.73909
            4.36235L4.73857 4.92878L2.97365 6.73758L4.73857 8.54638L4.44805 9.23577H0.36501L0.0744866 8.54638L1.83941 6.73758L0.0744866 4.92878L0.0739746 4.36235L1.84041 2.54544L0.0739746 0.728532ZM2.40653 1.96314L3.48729 0.851491L1.32577 0.851491L2.40653 1.96314ZM2.40653 3.12774L0.931632 4.64479L2.40653 6.15636L3.88143 4.64479L2.40653 3.12774ZM2.40653 7.3188L1.32819 8.42395H3.48487L2.40653 7.3188Z" />
        </svg>
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
      <Switcher id="switch" onChange={switchTheme} checked={checkedTheme === 'dark'} />
    </header>
  );
};

export default Header;
