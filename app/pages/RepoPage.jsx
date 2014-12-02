'use strict';

var React  = require('react');
var Reflux = require('reflux');
var Router = require('react-router');

var repoStore   = require('../stores/repoStore');
var repoActions = require('../actions/repoActions');
var Repo        = require('../components/Repo.jsx');

var RepoPage = React.createClass({
  mixins: [
    Reflux.listenTo(repoStore, 'onRequestComplete', 'initialCallback'),
    Router.State
  ],

  getInitialState() {
    return {
      repo: null,
      isLoading: true
    };
  },

  getRepoFullName() {
    var params = this.getParams();
    return params.login + '/' + params.name;
  },

  componentDidMount() {
    this.requestRepo();
  },

  componentWillReceiveProps(nextProps) {
    this.requestRepo();
  },

  requestRepo() {
    var fullName = this.getRepoFullName();
    if (repoStore.get(fullName)) {
      // Load directly from the store without requesting it again
      this.setState({
        repo: repoStore.get(fullName),
        isLoading: false
      });
    } else {
      this.setState({
        isLoading: true
      });
      repoActions.request(fullName);
    }
  },

  onRequestComplete(repo) {
    this.setState({
      repo: repo,
      isLoading: false
    });
  },

  render() {

    if (this.state.isLoading)
      return (<p>Loading repo...</p>);
    
    // No errors
    return (
      <div>
        <Repo repo={ this.state.repo } />
      </div>
    );
  }
});

module.exports = RepoPage;