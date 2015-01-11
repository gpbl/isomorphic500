import React from 'react';
import PageStore from '../stores/PageStore';
import { StoreMixin } from 'fluxible-app';

const Page = React.createClass({

  mixins: [StoreMixin],
  
  statics: {
    storeListeners: [PageStore]
  },
  
  getInitialState() {
    return this.getStore(PageStore).getState();
  },

  onChange() {
    var state = this.getStore(PageStore).getState();
    this.setState(state);
  },

  render() {
    return <p>{ this.state.content }</p>;
  }
  
});

export default Page;