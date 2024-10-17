// @flow
import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Switcher from '../../atoms/Switcher';
import Logo from '../../atoms/Logo';
import NavBar from '../../atoms/NavBar';
import DropDown from '../../atoms/DropDown';
import { useViewStore } from '../../../store/ViewStore';

type Props = {
  checkedTheme: string,
  switchTheme: Function,
}

const Header = ({ checkedTheme, switchTheme }: Props) => {
  const viewStore = useViewStore();

  const links = [
    {
      href: 'https://spacemesh.io/start/',
      title: 'join the network',
    },
    {
      href: toJS(viewStore.network.explorer),
      title: 'explorer',
    },
  ];

  return (
    <div className="header">
      <Logo />
      <NavBar links={links} />
      <DropDown />
      <Switcher id="switch" onChange={switchTheme} checked={checkedTheme === 'dark'} />
    </div>
  );
};

export default observer(Header);
