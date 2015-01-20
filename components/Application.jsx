import React from 'react';
import { RouterMixin } from 'flux-router-component';
import { StoreMixin } from 'fluxible';
import { assign } from 'lodash';

import NavBar from './NavBar.jsx';
import Home from './Home.jsx';

import ApplicationStore from '../stores/ApplicationStore';
import I18nStore from '../stores/I18nStore';
var Application = React.createClass({
  
  mixins: [RouterMixin, StoreMixin],

  statics: {
    storeListeners: [ApplicationStore, I18nStore]
  },

  getInitialState() {
    return this.getState();
  },
  
  onChange(stores) {
    this.setState(this.getState());
  },

  getState() {
    const appState = this.getStore(ApplicationStore).getState();
    const i18nState = this.getStore(I18nStore).getState();
    return assign(appState, i18nState)
  },

  render() {
    const props = assign(this.props, {
      messages: this.state.messages,
      locales: this.state.locales
    });

    var content = '';
    switch (this.state.currentPageName) {
      case 'home':
        content = <Home {...props} />;
        break;
    }
    //render content
    return (
      <div>
        <NavBar {...props} />
        { content }
      </div>
    );
  }

});

export default Application;