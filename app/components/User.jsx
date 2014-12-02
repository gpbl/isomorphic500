'use strict';
var React = require('react');

var User = React.createClass({

	propTypes: {
		user: React.PropTypes.object.isRequired
	},

  render() {
  	var user = this.props.user;
    return (
    	<div>
        <img src={ user.avatarUrl } width="50" />
    		<h1 className="mui-font-style-headline">{ user.name }</h1>
        <p className="mui-font-style-subhead-1">({ user.login }) from { user.location }</p> 
	    </div>
	   );
  }
});

module.exports = User;