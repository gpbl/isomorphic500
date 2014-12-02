'use strict';

var React = require('react/addons');
var Router = require('react-router');
var mui = require('material-ui');

var Header = React.createClass({

	mixins: [
		Router.Navigation,
		React.addons.LinkedStateMixin
	],

	getInitialState() {
    return {
    	loginOrRepo: ''
    };
  },

	render() {
		return (
			<div>
        <mui.Input ref="firstname" onChange={this._onChange} 
                   type="text" name="loginOrRepo" 
                   placeholder="login or login/repository" 
                   valueLink={ this.linkState('loginOrRepo') }
                   onBlur={ this.handleBlur } 
                   onKeyUp={ this.handleKeyUp } 
                   description="Examples: callemall/material-ui, gaearon " />
    	</div>
		);
	},

  handleKeyUp(e) {
      if (e.keyCode === 13) {
        e.target.blur();
        this.handleBlur();
      }
    },

    handleBlur(e) {
      if (!this.state.loginOrRepo.trim()) return;
      this.transitionTo('/' + this.state.loginOrRepo);
    }
});

module.exports = Header;