import React from 'react';
import IntlMixin from 'react-intl';
import { StoreMixin } from 'fluxible';
import { assign, random } from 'lodash';
import { BROWSER } from '../utils/env';
import PhotosStore from '../stores/PhotosStore';
import Caption from './photos/Caption.jsx';

const Home = React.createClass({
  mixins: [StoreMixin, IntlMixin],
  
  statics: {
    storeListeners: [PhotosStore]
  },

  getInitialState() {
    return this.getState();
  },

  onChange() {
    this.setState(this.getState());
  },

  getState() {
    const storeState = this.getStore(PhotosStore).getState();
    return assign(storeState, {
      currentIndex: 0
    });
  },

  render() {
    if (BROWSER) require('../style/components/home.scss');

    const { currentIndex, photos } = this.state;
    const photo = photos[currentIndex];

    return (
      <div className="home" 
        style={{backgroundImage: `url(${photo.image_url})`}}>
        <div className="home__caption">
          <Caption photo={photo} />
        </div>
      </div>
    );
  }
});

export default Home;