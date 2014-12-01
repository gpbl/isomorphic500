'use strict';
var React = require('react');

var User = React.createClass({

	propTypes: {
		user: React.PropTypes.object.isRequired
	},

  render: function () {
  	var user = this.props.user;
    return (
    	<div>
    		<h1>{ user.name }</h1>
        <p>({ user.login }) from { user.location }</p> 
	    </div>
	   );
  }
});

module.exports = User;