'use strict';
var React = require('react');
var { Link } = require('react-router');
var Explore = require('../components/Explore.jsx');

var Home = React.createClass({

  render() {
    return (
    	<div className="mui-app-content-canvas">
    		<div className="full-width-section">
          <h3 className="mui-font-weight-light">
            Set a repository or try
            with <Link to="repo" params={{ login: 'facebook', name: 'react'}}>facebook/react
            </Link> or <Link to="user" params={{ login: 'gpbl' }}>gpbl</Link>.
          </h3>
          <br/>
          <Explore />
	      </div>
      </div>
     );
  }
});

module.exports = Home;