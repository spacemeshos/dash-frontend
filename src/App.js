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

type Props = {
  viewStore: Object,
  uiStore: Object,
}

const App = (props: Props) => {
  const { viewStore, uiStore } = props;

  window.name = '_dash';

  return (
    <>
      <Layout viewStore={viewStore} uiStore={uiStore}>
        <Switch>
          <Route exact path="/" component={() => <Home viewStore={viewStore} uiStore={uiStore} />} />
          <Route exact path="/not-found" component={NotFound} status={404} />
          <Redirect to="/not-found" />
        </Switch>
      </Layout>
    </>
  );
};

export default App;
