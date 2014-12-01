'use strict';

var React            = require('react');
var Router           = require('react-router');
var DocumentTitle    = require('react-document-title');
var Header           = require('./Header.jsx');

var App = React.createClass({

  mixins: [
    Router.State
  ],

  getInitialState: function() {
    return this.getCurrentState();
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.getCurrentState());
  },

  getCurrentState: function() {
    return {
      userOrRepository: this.getPathname().replace('/', '')
    };
  },

  render: function () {
    return (
      <DocumentTitle title="Repobrowser">
        <div>
          <Header userOrRepository={ this.state.userOrRepository } />
          <Router.RouteHandler />
        </div>
      </DocumentTitle>
    );
  },

});

module.exports = App;