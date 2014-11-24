'use strict';

var React       = require('react');
var Router      = require('react-router');
var reactRoutes = require('./react-routes.jsx');
var title       = require('./helpers/document-title');

// Render the current route server-side using views/page.ejs 
var routes = function (req, res, next) {
	Router.run(reactRoutes, req.path, function (Handler, state) {
		
		var handlerElement = React.createElement(Handler);
		var html           = React.renderToString(handlerElement);
		var title          = title(state.routes, state.params);

		res.render('page', {
			title: title,
			html: html,
			props: handlerElement.props
		});

	});
};

module.exports = routes;