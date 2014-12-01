'use strict';

var React         = require('react');
var Router        = require('react-router');

var App          = require('../pages/App.jsx');
var HomePage     = require('../pages/HomePage.jsx');
var NotFoundPage = require('../pages/NotFoundPage.jsx');
var UserPage     = require('../pages/UserPage.jsx');
var RepoPage     = require('../pages/RepoPage.jsx');

var routes = (
  <Router.Route name="app" path="/" handler={ App }>
    
    <Router.Route name="user" path=":login" handler={ UserPage } />
    <Router.Route name="repo" path=":login/:name" handler={ RepoPage } />

    <Router.DefaultRoute name="index" handler={ HomePage } />
    <Router.NotFoundRoute name="notfound" handler={ NotFoundPage }/>
  
  </Router.Route>
);

module.exports = routes;
