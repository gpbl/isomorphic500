var React = require('react');
var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');

var Page = React.createClass({
  componentDidMount: function() {
    console.log('Component did mount.');
  },
  render: function() {
    return ( 
      <div>
      	<Header />
	        <p>
	        	{ this.props.greetings }
      		</p>
      	<Footer />
      </div>
    );
  }
});

module.exports = Page;