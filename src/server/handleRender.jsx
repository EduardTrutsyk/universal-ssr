import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';

import routes from '../client/routes';
import configureStore from '../client/configureStore';
import App from '../client/app';

function renderFullPage(html, preloadedState) {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
  `;
}

function handleRender(req, res) {
  const store = configureStore();

  const branch = matchRoutes(routes, req.url);
  const promises = branch.map(({ route, match }) => {
    const { fetchData } = route.component;

    if (!(fetchData instanceof Function)) {
      return Promise.resolve(null);
    }

    return fetchData(store.dispatch, match);
  });

  return Promise.all(promises)
    .then(() => {
      const context = {};
      const app = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context} >
            <App name="World" />
          </StaticRouter>
        </Provider>
      );

      const html = renderToString(app);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(context.url);
      }

      // Grab the initial state from our Redux store
      const preloadedState = store.getState();

      return res.send(renderFullPage(html, preloadedState));
    });
}

export default handleRender;
