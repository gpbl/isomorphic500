import React from 'react';
import Application from '../app/Application.jsx';

React.render(
  <Application url={ location.pathname + (location.search || '') } />,
  document.getElementById('mountNode')
);

var serverSideStyle = document.getElementById("server-side-style");
if (serverSideStyle)
  document.getElementsByTagName("head")[0].removeChild(serverSideStyle);