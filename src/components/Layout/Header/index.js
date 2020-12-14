// @flow
import React from 'react';
import Switcher from '../../atoms/Switcher';
import Logo from '../../atoms/Logo';
import NavBar from '../../atoms/NavBar';
import DropDown from '../../atoms/DropDown';

type Props = {
  checkedTheme: string,
  switchTheme: Function,
  viewStore: Object,
}

const links = [
  {
    href: 'https://spacemesh.io/testnet/',
    title: 'join testnet',
  },
  {
    href: 'https://stage-explore.spacemesh.io/',
    title: 'explore testnet',
  },
];

const Header = (props: Props) => {
  const { checkedTheme, switchTheme, viewStore } = props;

  return (
    <div className="header">
      <Logo />
      <NavBar links={links} />
      <DropDown viewStore={viewStore} />
      <Switcher id="switch" onChange={switchTheme} checked={checkedTheme === 'dark'} />
    </div>
  );
};

export default Header;
