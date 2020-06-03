import React, { useState, useEffect } from 'react';
import Header from './Header';
import Line from '../../assets/right_decoration.svg';
// ContextProviders
import { LayoutContext } from '../../contextProviders/layoutContext';

const Layout = ({ children }) => {
  const [checkedTheme, setCheckedTheme] = useState('light');

  useEffect(() => {
    const color = localStorage.getItem('theme-color');
    setCheckedTheme(color);
  }, []);

  const switchTheme = (e) => {
    const color = e.target.checked ? 'dark' : 'light';
    setCheckedTheme(color);
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${color}`);
    localStorage.setItem('theme-color', color);
  };

  return (
    <LayoutContext.Provider value={{ checkedTheme }}>
      <div className="site-wrapper">
        <Header switchTheme={switchTheme} checkedTheme={checkedTheme} />
        <main>
          <div className="corner-box">
            { children }
          </div>
        </main>
      </div>
      <div className="rightLine">
        <img src={Line} alt="" />
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
