// @flow
import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Switcher from '../../atoms/Switcher';
import Logo from '../../atoms/Logo';
import NavBar from '../../atoms/NavBar';
import DropDown from '../../atoms/DropDown';

type Props = {
  checkedTheme: string,
  switchTheme: Function,
  viewStore: Object,
}

const Header = (props: Props) => {
  const { checkedTheme, switchTheme, viewStore } = props;

  const links = [
    {
      href: 'https://spacemesh.io/testnet/',
      title: 'join testnet',
    },
    {
      href: toJS(viewStore.network.explorer),
      title: 'explore testnet',
    },
  ];
  console.log('viewStore.network.value', toJS(viewStore.network.explorer));

  return (
    <div className="header">
      <Logo />
      <NavBar links={links} />
      <DropDown viewStore={viewStore} />
      <Switcher id="switch" onChange={switchTheme} checked={checkedTheme === 'dark'} />
    </div>
  );
};

export default observer(Header);
