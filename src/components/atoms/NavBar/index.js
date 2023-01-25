// @flow
import * as React from 'react';

import { nanoid } from 'nanoid';

type Props = {
  links: Array<Object>
};

const NavBar = ({ links }: Props) => (
  <nav className="navbar">
    <ul className="navbar-list">
      {links.map((link) => (
        <li key={nanoid()} className="navbar-list-item">
          <a href={link.href} target="_spacemesh" rel="noopener noreferrer">{link.title}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default NavBar;
