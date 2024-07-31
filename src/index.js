// @flow
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import ViewStore, { ViewStoreProvider } from './store/ViewStore';
import UiStore, { UiStoreProvider } from './store/UiStore';
import reportWebVitals from './reportWebVitals';

const viewStore = new ViewStore();
const uiStore = new UiStore();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <UiStoreProvider store={uiStore}>
    <ViewStoreProvider store={viewStore}>
      <App />
    </ViewStoreProvider>
  </UiStoreProvider>,
);

reportWebVitals();
