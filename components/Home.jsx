import React from 'react';
import { StoreMixin } from 'fluxible-app';
import PhotosStore from '../stores/PhotosStore';

const Home = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [PhotosStore]
  },
  getInitialState() {
    console.log('getInitialState of Home.jsx', this.getStore(PhotosStore).getState().photos.length, 'photos');
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
          this.state.photos.map((photo) => {
            return <p>{ photo.title }</p>;
          })
        }
      </div>
    );
  }
});

export default Home;