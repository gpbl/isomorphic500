'use strict';

var React  = require('react');
var Router = require('react-router');
var Header = require('../components/Header.jsx');
var mui    = require('material-ui');

var DocumentTitle = require('react-document-title');

var App = React.createClass({

  mixins: [Router.State],

  getInitialState() {
    return this.getCurrentState();
  },

  componentWillReceiveProps(nextProps) {
    this.setState(this.getCurrentState());
  },

  getCurrentState() {
    return {
      loginOrRepo: this.getPathname().replace('/', '')
    };
  },

  render () {
    return (
      <DocumentTitle title="Repobrowser">
        <mui.AppCanvas predefinedLayout={1}>
          <Header loginOrRepo={ this.state.loginOrRepo } />
          <Router.RouteHandler />
        </mui.AppCanvas>
      </DocumentTitle>
    );
  },

});

module.exports = App;