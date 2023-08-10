import React, { useState, useEffect } from 'react';
import Header from './Header';
import darkLine from '../../assets/right_decoration.svg';
import whiteLine from '../../assets/darkTheme/right_decoration_dark.svg';
import { useViewStore } from '../../store/ViewStore';

const Layout = (props) => {
  const viewStore = useViewStore();
  const { children } = props;
  const [checkedTheme, setCheckedTheme] = useState(localStorage.getItem('theme') || 'light');

  const setColor = (color: string) => {
    setCheckedTheme(color);
    document.documentElement.className = '';
    document.documentElement.classList.add(`theme-${color}`);
    localStorage.setItem('theme', color);
  };

  const switchTheme = (e) => {
    const color = e.target.checked ? 'dark' : 'light';
    setColor(color);
  };

  const hideLine = window.location.search.indexOf('hide-right-line') === -1;
  const darkMode = window.location.search.indexOf('darkMode') !== -1;

  useEffect(() => {
    const color = darkMode ? 'dark' : localStorage.getItem('theme');
    setColor(color);
  }, [darkMode]);

  return (
    <>
      <div className="site-wrapper">
        {hideLine && (<Header switchTheme={switchTheme} checkedTheme={checkedTheme} viewStore={viewStore} />)}
        <main>
          <div className="corner-box">
            {children}
          </div>
        </main>
      </div>
      {hideLine && (
        <div className="rightLine">
          <img src={checkedTheme === 'light' ? darkLine : whiteLine} alt="" />
        </div>
      )}
    </>
  );
};

export default Layout;
