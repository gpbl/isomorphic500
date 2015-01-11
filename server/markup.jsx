// Generate the HTML markup server-side for the app's first load
// This file must be parsed by webpack before being used in node.js

import React from 'react';
import Application from '../app/Application.jsx';

var styleCollector = require("./helpers/style-collector");

export default function(req, mainScript) {
  var html;

  const css = styleCollector.collect(() => {
    html = React.renderToString(<Application url={req.url}/>);
  });

  return React.renderToStaticMarkup(
    <html>
      <style id="server-side-style" dangerouslySetInnerHTML={{__html: css}} />
      <body>
        <div id="mountNode" dangerouslySetInnerHTML={{__html: html}} />
        <script src={ mainScript }></script>
      </body>
    </html>
  );
}