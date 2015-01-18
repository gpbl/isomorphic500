import createStore from 'fluxible/utils/createStore';

import { RECEIVE_PHOTOS } from '../actions';

export default createStore({

  storeName: 'PhotosStore',
  
  initialize(dispatcher) {
    this.photos = [];
  },
  
  handleReceivePhotos(photos) {
    this.photos = photos;
    this.emitChange();
  },
  
  handlers: {
    [RECEIVE_PHOTOS]: 'handleReceivePhotos'
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