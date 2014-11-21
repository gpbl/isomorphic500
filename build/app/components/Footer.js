var React = require('react');
var Footer = React.createClass({displayName: 'Footer',
		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement("hr", null), 
					React.createElement("i", null, "Footer")
				)
			);
		}
});

module.exports = Footer;