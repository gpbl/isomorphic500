import createStore from 'fluxible-app/utils/createStore';

export default createStore({

  storeName: 'PhotosStore',
  
  initialize(dispatcher) {
    this.photos = [];
  },
  
  handleReceivePhotos(photos) {
    this.photos = photos;
    this.emit('change');
  },
  
  handlers: {
    'RECEIVE_PHOTOS': 'handleReceivePhotos'
  },
  
  getState() {
    return { photos: this.photos };
  },
  
  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.photos = state.photos;
  }
});