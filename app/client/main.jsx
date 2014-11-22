/* global props */
"use strict";

var React = require('react');
var Router = require('react-router');

var reactRoutes = require('../routes/react-routes.jsx');

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
		Router.run(reactRoutes, Router.HistoryLocation, function (Handler) {
			React.render(<Handler /> , document.body);
		});
});
