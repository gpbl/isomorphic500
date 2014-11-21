"use strict";

var React = require('react');

var Header = React.createClass({
  render: function() {
    return (
    	<div class="header">
				<h1>{this.props.title}</h1>	    	
	    </div>
    );
  }
});

module.exports = Header;