import React from 'react';
import Header from './Header';
import Line from '../../assets/rightLineBg.svg'

const Layout = ({ children }) => (
  <>
    <div className="site-wrapper">
      <Header />
      <main>
        <div className="corner-box">
          { children }
        </div>
      </main>
    </div>
    <div className="rightLine">
      <img src={Line} alt="" />
    </div>
  </>
);

export default Layout;
