var React = require('react');

var Footer = React.createClass({
		render: function() {
			return (
				/* jshint ignore:start */
				<div>
					<hr/>
					{ new Date() }
				</div>
				/* jshint ignore:end */
			);
		}
});

module.exports = Footer;