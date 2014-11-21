"use strict";

var React = require('react');
var PageContent = require('./PageContent.jsx');

var Page = React.createClass({
  render: function() {
    return ( 
      <div>
        <PageContent {...this.props} />
      </div>
    );
  }
});

module.exports = Page;