'use strict';

var React        = require('react');
var Router       = require('react-router');
var Route        = Router.Route;
var DefaultRoute = Router.DefaultRoute;

/* Components */
var App   = require('../components/App.jsx');
var Index = require('../components/Index.jsx');
var Place = require('../components/Place.jsx');

var routes = (
  <Route name="places" path="/" handler={App}>
    <DefaultRoute name="index" handler={Index}/>
    <Route name="place" path="place/:id" handler={Place} />
  </Route>
);

module.exports = routes;
