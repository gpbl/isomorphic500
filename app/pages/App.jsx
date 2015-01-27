'use strict';

var React  = require('react');
var {RouteHandler, Navigation} = require('react-router');
var mui    = require('material-ui');

var DocumentTitle = require('react-document-title');

var App = React.createClass({
  mixins: [ Navigation ],

  onGithubTouchTap: function(){
    document.location.href = 'http://github.com/gpbl/isomorphic-react-template';
  },

  onHomeTap: function() {
    this.transitionTo('home');
  },

  render () {
    var title = "Repobrowser";
    return (
      <DocumentTitle title={ title }>
        <mui.AppCanvas predefinedLayout={1}>
          <mui.AppBar
            title={ title }
            showMenuIconButton={false}
            className="mui-dark-theme"
            zDepth={0}>
             <mui.IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this.onGithubTouchTap} />
             <mui.IconButton style={{float: "right"}} icon="action-home" onTouchTap={this.onHomeTap} />

          </mui.AppBar>
          <RouteHandler />

        </mui.AppCanvas>
      </DocumentTitle>
    );
  },

});

module.exports = App;