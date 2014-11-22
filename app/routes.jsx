'use strict';
var React = require('react');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App.jsx');
var Index = require('./components/Index.jsx');
var State = require('./components/State.jsx');

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="state" path="state/:abbr" handler={State}/>
  </Route>
);

module.exports = routes;
