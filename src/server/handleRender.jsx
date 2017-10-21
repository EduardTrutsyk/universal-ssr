import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../client/app';

function renderFullPage(html) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
  `;
}

function handleRender(req, res) {
  const html = renderToString(<App name="World" />);

  res.send(renderFullPage(html));
}

export default handleRender;
