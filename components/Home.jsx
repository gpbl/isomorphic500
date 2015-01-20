import React from 'react';
import IntlMixin from 'react-intl';
import { StoreMixin } from 'fluxible';
import PhotosStore from '../stores/PhotosStore';
import moment from 'moment';

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

    if (require('../utils/env').BROWSER) {
      require('../style/components/home.scss');
    }

    const bg = this.state.photos[0].image_url;

    return (
      <div className="home" style={{backgroundImage: `url(${bg})`}}>
        
      </div>
    );
  }
});

export default Home;