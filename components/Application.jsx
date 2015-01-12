import React from 'react';
import { RouterMixin } from 'flux-router-component';
import { StoreMixin } from 'fluxible-app';

import Navigation from './Navigation.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Page from './Page.jsx';
import Timestamp from './Timestamp.jsx';
import ApplicationStore from '../stores/ApplicationStore';

var Application = React.createClass({
  
  mixins: [RouterMixin, StoreMixin],

  statics: {
    storeListeners: [ApplicationStore]
  },

  getInitialState() {
    return this.getStore(ApplicationStore).getState();
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.pageTitle === prevState.pageTitle) return;
    document.title = this.state.pageTitle;
  },

  onChange() {
    const state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },

  render() {
    require('../style/main.scss');
    
    var content = '';
    switch (this.state.currentPageName) {
      case 'home':
        content = <Home context={this.props.context}/>;
        break;
      case 'about':
        content = <About/>;
        break;
      case 'page':
        content = <Page context={this.props.context}/>;
        break;
    }
    //render content
    return (
      <div>
         <Navigation selected={this.state.currentPageName} links={this.state.pages} context={this.props.context}/>

        { content }
        <Timestamp context={this.props.context}/>
      </div>
    );
  }

});

export default Application;