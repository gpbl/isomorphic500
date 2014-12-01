'use strict';

var React = require('react');
var Router = require('react-router');

var Header = React.createClass({

	mixins: [
		Router.Navigation,
		React.addons.LinkedStateMixin
	],

	propTypes: {
		userOrRepository: React.PropTypes.string
	},

	getInitialState: function () {
    return {
    	userOrRepository: this.props.userOrRepository
    };
  },

  componentWillReceiveProps: function(nextProps) {
  	this.setState(nextProps);
  },

	render: function() {
		return (
			<div>
				<input type="text" 
							 placeholder="login or login/repository"
               valueLink={ this.linkState('userOrRepository') } 
               onBlur={ this.handleBlur } 
               onKeyUp={ this.handleKeyUp } />
			</div>
		);
	},

  handleKeyUp: function (e) {
    if (e.keyCode === 13) {
      this.transitionTo('/' + this.state.userOrRepository);
      e.target.blur();
    }
  },

  handleBlur: function (e) {
    this.transitionTo('/' + this.state.userOrRepository);
  }

});

module.exports = Header;