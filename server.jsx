'use strict';

var React         = require('react');
var Router        = require('react-router');
var DocumentTitle = require('react-document-title');

var routes = require('./routes.jsx');
var Html   = require('./components/Html.jsx');

module.exports = function (req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {
    
    var title  = DocumentTitle.rewind();
    var markup = React.renderToString(<Handler />);
    var html   = React.renderToStaticMarkup(<Html title={title} markup={markup} />);

    // TODO: send 404 status code 
    // (see: https://github.com/gpbl/isomorphic-react-template/issues/3)
    res.send('<!DOCTYPE html>' + html);
  });
};

