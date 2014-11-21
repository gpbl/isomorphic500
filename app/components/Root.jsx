"use strict";

var React = require('react');
var Page = require('./Page.jsx');

var Root = React.createClass({
  render: function() {
    return ( 
      <div>
        <Page {...this.props} />
      </div>
    );
  }
});

module.exports = Root;