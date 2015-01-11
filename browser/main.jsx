import React from 'react';
import Application from '../app/Application.jsx';

React.render(
  <Application url={ location.pathname + (location.search || '') } />,
  document.getElementById('mountNode')
);
