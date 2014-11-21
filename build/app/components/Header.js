var React = require('react');
var Header = React.createClass({displayName: 'Header',
  render: function() {
    return (
      React.createElement("h1", {className: "header"}, 
        "My Web App"
      )
    );
  }
});

module.exports = Header;