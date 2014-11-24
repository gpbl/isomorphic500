/* global props */
"use strict";

var React = require('react');
var Router = require('react-router');

var reactRoutes = require('../routes/react-routes.jsx');
var reactRoutes = require('../routes/react-routes.jsx');
var documentTitle = require('../routes/helpers/document-title');

document.addEventListener("DOMContentLoaded", function(event) {
		Router.run(reactRoutes, Router.HistoryLocation, function (Handler, state) {
			document.title = documentTitle(state.routes, state.params);
			React.render(<Handler /> , document.body);
		});
});
