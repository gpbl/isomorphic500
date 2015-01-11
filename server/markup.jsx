// Generate the HTML markup server-side for the app's first load
// This file must be parsed by webpack before being used in node.js

import React from 'react';
import Application from '../app/Application.jsx';

export default function(req, mainScript) {
  const html = React.renderToString(<Application url={req.url}/>);
  return React.renderToStaticMarkup(
    <html>
      <body>
        <div id="mountNode" dangerouslySetInnerHTML={{__html: html}} />
        <script src={ mainScript }></script>
      </body>
    </html>
  );
}