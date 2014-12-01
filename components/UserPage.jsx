'use strict';

var React      = require('react');
var Reflux     = require('reflux');
var Router     = require('react-router');

var userActions = require('../actions/userActions');

var userStore   = require('../stores/userStore');
var errorStore  = require('../stores/errorStore');

var userStarredReposStore   = require('../stores/userStarredReposStore');
var userStarredReposActions = require('../actions/userStarredReposActions');


var User       				= require('./User.jsx');

var UserPage = React.createClass({
	mixins: [
	 	Reflux.listenTo(userStore, 'onRequestComplete'),
	 	Reflux.listenTo(userStarredReposStore, 'onStarredReposRequestComplete'),
	 	Reflux.listenTo(errorStore, 'onRequestError'),
		Router.State
	],

	getInitialState: function() {
		return {
			user: null,
			isLoading: true,
			starredRepos: []
		};
	},

	componentDidMount: function() {
		this.requestData();
	},

	componentWillReceiveProps: function(nextProps) {
		this.requestData();
	},

	requestData: function(){
		this.requestUser();
		this.requestStarredRepos();
	},

	requestUser: function () {
		var login = this.getParams().login;
		if (userStore.get(login)) {
			this.onRequestComplete(userStore.get(login));
		} else {
			this.setState({
				isLoading: true
			});
			userActions.request(login);
		}
	},

	requestStarredRepos: function(){
		var login = this.getParams().login;
		if (userStarredReposStore.get(login)) {
      this.onStarredReposRequestComplete(userStarredReposStore.get(login));
    }
    else {
    	this.setState({
				isLoadingStarredRepos: true
			});
      userStarredReposActions.request(login);
    }
	},

	onRequestComplete: function (user) {
		this.setState({
			user: user,
			isLoading: false,
			errorMessage: null
		});
	},

	onStarredReposRequestComplete: function (repos) {
		this.setState({
			starredRepos: repos,
			isLoadingStarredRepos: false
		});
	},

	onRequestError: function(message) {
		this.setState({
			errorMessage: message
		});
	},

	renderStarredRepos: function() {
		if (this.state.starredRepos.length === 0) {
			return <p>No starred repos :-(</p>;
		}
		else {
			return (
				<ul>
          { this.state.starredRepos.map(function(repo) {
            return (
            <li key={repo.fullName}>
              <Router.Link to="repo" params={{ login: repo.owner.login, name: repo.name }}>
                {repo.name}
              </Router.Link> by <Router.Link to="user" params={{login: repo.owner.login}}>{repo.owner.login}</Router.Link>
            </li>
            );
          })}
        </ul>
	    );
		}
	},

  render: function () {
  	
  	if (this.state.errorMessage)	
  		return (<p>{ this.state.errorMessage} </p>);
  	
  	if (this.state.isLoading)	
  		return (<p>Loading user...</p>);

  	else 
  		return (<div>
  				<User user={ this.state.user } />
  				<h2>Starred repos</h2>
  				{ this.state.isLoadingStarredRepos ? 
  					<p>Loading starred repos...</p> : 
	  				this.renderStarredRepos()
      		}
  			</div>);

  }

});

module.exports = UserPage;