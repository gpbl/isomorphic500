'use strict';

var React  = require('react');
var Router = require('react-router');

var reactRoutes = require('./react-routes.jsx');

// Render the current route with views/page.ejs 
var routes = function (req, res, next) {
	Router.run(reactRoutes, req.path, function (Handler) {
		var handlerElement = React.createElement(Handler);
		var html = React.renderToString(handlerElement);
		res.render('page', {
			html: html,
			props: handlerElement.props
		});
	});
};

module.exports = routes;