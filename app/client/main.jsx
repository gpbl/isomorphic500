/* global props */
"use strict";

var React  = require('react');
var Router = require('react-router');
var routes = require('../routes/react-routes.jsx');
var title  = require('../routes/helpers/document-title');

document.addEventListener("DOMContentLoaded", function(event) {
		Router.run(routes, Router.HistoryLocation, function (Handler, state) {
			document.title = title(state.routes, state.params);
			React.render(<Handler />, document.body);
		});
});
