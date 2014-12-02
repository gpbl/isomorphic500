'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Header = React.createClass({

	mixins: [
		Router.Navigation,
		React.addons.LinkedStateMixin
	],

	propTypes: {
		loginOrRepo: React.PropTypes.string
	},

	getInitialState() {
    return {
    	loginOrRepo: this.props.loginOrRepo
    };
  },

  componentWillReceiveProps(nextProps) {
  	this.setState(nextProps);
  },

	render() {
		return (
			<div>
				<input type="text" 
							 placeholder="login or login/repository"
               valueLink={ this.linkState('loginOrRepo') } 
               onBlur={ this.handleBlur } 
               onKeyUp={ this.handleKeyUp } />
			</div>
		);
	},

  handleKeyUp(e) {
      if (e.keyCode === 13) {
        this.transitionTo('/' + this.state.loginOrRepo);
        e.target.blur();
      }
    },

    handleBlur(e) {
      this.transitionTo('/' + this.state.loginOrRepo);
    }
});

module.exports = Header;