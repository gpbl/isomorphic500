'use strict';

var React      = require('react');
var Reflux     = require('reflux');
var Router     = require('react-router');

var userActions = require('../actions/userActions');

var userStore   = require('../stores/userStore');
var errorStore  = require('../stores/errorStore');

var userStarredReposStore   = require('../stores/userStarredReposStore');
var userStarredReposActions = require('../actions/userStarredReposActions');

var User 	= require('../components/User.jsx');

var UserPage = React.createClass({
	mixins: [
	 	Reflux.listenTo(userStore, 'onRequestComplete'),
	 	Reflux.listenTo(userStarredReposStore, 'onStarredReposRequestComplete'),
	 	Reflux.listenTo(errorStore, 'onRequestError'),
		Router.State
	],

	getInitialState() {
		return {
			user: null,
			isLoading: true,
			starredRepos: []
		};
	},

	componentDidMount() {
		this.requestData();
	},

	componentWillReceiveProps(nextProps) {
		this.requestData();
	},

	requestData(){
		this.requestUser();
		this.requestStarredRepos();
	},

	requestUser () {
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

	requestStarredRepos(){
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

	onRequestComplete (user) {
		this.setState({
			user: user,
			isLoading: false,
			errorMessage: null
		});
	},

	onStarredReposRequestComplete (repos) {
		this.setState({
			starredRepos: repos,
			isLoadingStarredRepos: false
		});
	},

	onRequestError(message) {
		this.setState({
			errorMessage: message
		});
	},

	renderStarredRepos() {
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

  render () {
  	
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