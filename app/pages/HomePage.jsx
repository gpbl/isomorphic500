'use strict';
var React = require('react');
var Router = require('react-router');

var Home = React.createClass({

  render: function () {
    return (
      <p>
        Set a repository or try
        with <Router.Link to="repo" params={{ login: 'facebook', name: 'react'}}>facebook/react
        </Router.Link> or <Router.Link to="user" params={{ login: 'gpbl' }}>gpbl</Router.Link>
      </p>
     );
  }
});

module.exports = Home;