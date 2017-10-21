import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

const app = (
  <BrowserRouter>
    <App name="World" />
  </BrowserRouter>
);

hydrate(app, document.getElementById('root'));
