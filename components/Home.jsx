import React from 'react';
import IntlMixin from 'react-intl';
import { StoreMixin } from 'fluxible-app';
import PhotosStore from '../stores/PhotosStore';

import LocaleSwitcher from './LocaleSwitcher.jsx';

const Home = React.createClass({
  mixins: [StoreMixin, IntlMixin],
  
  statics: {
    storeListeners: [PhotosStore]
  },

  getInitialState() {
    return this.getStore(PhotosStore).getState();
  },

  onChange() {
    const state = this.getStore(PhotosStore).getState();
    this.setState(state);
  },

  render() {
    return (
      <div>
        <p>{ this.getIntlMessage('home.welcome') }</p>

        <LocaleSwitcher context={this.props.context} />

        { 
          this.state.photos.map((photo, i) => {
            return <p key={i}>{ photo.name }</p>;
          })
        }
      </div>
    );
  }
});

export default Home;