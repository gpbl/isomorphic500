var React = require('react');
var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');

var Page = React.createClass({displayName: 'Page',
  componentDidMount: function() {
    console.log('Component did mount.');
  },
  render: function() {
    return ( 
      React.createElement("div", null, 
      	React.createElement(Header, null), 
	        React.createElement("p", null, 
	        	 this.props.greetings
      		), 
      	React.createElement(Footer, null)
      )
    );
  }
});

module.exports = Page;