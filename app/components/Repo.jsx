'use strict';
var React = require('react');
var Router = require('react-router');

var Repo = React.createClass({

	propTypes: {
		repo: React.PropTypes.object.isRequired
	},

  render: function () {
  	var repo = this.props.repo;
    return (
	    <div>
	    	<h1>{ repo.name }</h1>
	    	<p>by <Router.Link to="user" params={ {login: repo.owner.login} }>{repo.owner.login}</Router.Link></p>
	    	<p>{ repo.description }</p>
	    </div>
	   );
  }
});

module.exports = Repo;