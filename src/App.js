// @flow
import * as React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// Styles
import 'normalize.css';
import './styles/Main.scss';

// Components
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => (
  <>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/not-found" component={NotFound} status={404} />
        <Redirect to="/not-found" />
      </Switch>
    </Layout>
  </>
);

export default App;
