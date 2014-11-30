'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');
var routes        = require('./routes.jsx');

module.exports = function (req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {
    
    var handlerElement = React.createElement(Handler);
    var html           = React.renderToString(handlerElement);
    var title          = DocumentTitle.rewind();

    res.render('page', { title: title, html: html });

  });
};

