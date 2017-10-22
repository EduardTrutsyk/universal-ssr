import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './configureStore';
import App from './app';

// Grab the state from a global variable injected into the server-generated HTML
const store = configureStore(window.PRELOADED_STATE);
// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App name="World" />
    </BrowserRouter>
  </Provider>
);

hydrate(app, document.getElementById('root'));
