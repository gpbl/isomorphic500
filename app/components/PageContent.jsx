"use strict";

var React = require('react');
var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');

var PageContent = React.createClass({
  render: function() {
    return ( 
      <div>
      	<Header title="react.js with express!" />
				{ this.props.greetings }        
				<div>
					<input type="text" />
				</div>
     		<Footer />
      </div>
    );
  }
});

module.exports = PageContent;