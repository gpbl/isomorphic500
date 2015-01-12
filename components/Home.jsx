import React from 'react';
import { StoreMixin } from 'fluxible-app';
import PhotosStore from '../stores/PhotosStore';

const Home = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [PhotosStore]
  },
  getInitialState() {
    return this.getStore(PhotosStore).getState();
  },
  onChange() {
    const state = this.getStore(CustomersStore).getState();
    this.setState(state);
  },
  render() {
    return (
      <div>
        <p>Welcome to the home page!</p>;
        { 
          this.state.photos.map((photo, i) => {
            return <p key={i}>{ photo.title }</p>;
          })
        }
      </div>
    );
  }
});

export default Home;