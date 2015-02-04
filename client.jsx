/* global document */
"use strict";

var React  = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');

// this tells webpack to load styles. 
// webpack will automatically generate a css bundle and add it to <head> tag

var style = require('./style/main.styl');

document.addEventListener("DOMContentLoaded", function(event) {
    Router.run(routes, Router.HistoryLocation, function (Handler, state) {
      React.render(<Handler />, document.body);
    });
});
