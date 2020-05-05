import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="site-wrapper">
    <Header />
    <main>
      <div className="corner-box">
        { children }
      </div>
    </main>
  </div>
);

export default Layout;
