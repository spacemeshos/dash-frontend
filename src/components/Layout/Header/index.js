// @flow
import React from 'react';
import Switcher from '../../atoms/Switcher';
import Logo from '../../atoms/Logo';
import NavBar from '../../atoms/NavBar';
import DropDown from '../../atoms/DropDown';

type Props = {
  checkedTheme: string,
  switchTheme: Function,
}

const links = [
  {
    href: '/',
    title: 'download wallet',
  },
  {
    href: '/',
    title: 'spacemesh home',
  },
];

const Header = (props: Props) => {
  const { checkedTheme, switchTheme } = props;

  return (
    <div className="header">
      <Logo />
      <NavBar links={links} />
      <DropDown />
      <Switcher id="switch" onChange={switchTheme} checked={checkedTheme === 'dark'} />
    </div>
  );
};

export default Header;
