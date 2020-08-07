// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import ViewStore from './store/ViewStore';
import UiStore from './store/UiStore';

const viewStore = new ViewStore();
const uiStore = new UiStore();

ReactDOM.render(
  <BrowserRouter>
    <App viewStore={viewStore} uiStore={uiStore} />
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
