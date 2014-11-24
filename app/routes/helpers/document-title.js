'use strict';

// Return the title as breadcrumbs for the given routes.
// Add a `title(params)` function to the handler component's statics for returning a title. 
module.exports = function (routes, params) {
	return routes.filter(function(route) {
 		return route.handler.title;
 	}).reduce(function(title, route, i, routes){
 		return title += route.handler.title(params) + (i < routes.length-1 ? ' > ' : '');
 	}, '');
};
