// @flow
import * as React from 'react';

// Styles
import 'normalize.css';
import './styles/Main.scss';

// Components
import Home from './pages/Home';
import Layout from './components/Layout';

const App = () => {
  window.name = '_dash';
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default App;
