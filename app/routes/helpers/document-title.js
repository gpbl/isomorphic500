'use strict';

// Return the title as breadcrumbs for the given routes. Used for the <title> (server) 
// and the document.title (client)
// Add a `documentTitle(params)` function to the handler component's statics for returning a title.
module.exports = function (routes, params) {
	return routes.filter(function(route) {
 		return route.handler.documentTitle;
 	}).reduce(function(documentTitle, route, i, routes){
 		return documentTitle += route.handler.documentTitle(params) + (i < routes.length-1 ? ' > ' : '');
 	}, '');
};
