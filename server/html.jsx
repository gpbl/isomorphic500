// Server "entry" file (per request). Used by fluxible-middleware.
//
// Generate the HTML markup server-side for the app's first load.
//
// This is parsed by webpack according to webpack/server.config
// so that we can require CSS in our components.

import React from 'react';

import Application from '../components/Application.jsx';
import Html from '../components/Html.jsx';

var styleCollector = require("./helpers/style-collector");

export default function(req, res) {
  const { context, state, mainScript } = res.locals;

  // collect markup and css for inline <style>s
  var markup;
  const css = styleCollector.collect(() => {
    markup = React.renderToString(<Application context={context} />);
  });

  return React.renderToStaticMarkup(
    <Html state={state}
      locale={req.locale}
      css={css}
      context={context}
      markup={markup}
      mainScript={mainScript} />
  );

}