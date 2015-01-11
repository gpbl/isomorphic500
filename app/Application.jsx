import React from 'react';

const Application = React.createClass({
  render: function() {
    return (
      <div className="application">
        <h1>Hello World!</h1>
        <pre>{this.props.url}</pre>
      </div>
    );
  }
});

export default Application;
