import createStore from 'fluxible-app/utils/createStore';

export default createStore({

  storeName: 'TimeStore',
  
  initialize(dispatcher) {
    this.time = new Date();
  },
  
  handleTimeChange(payload) {
    this.time = new Date();
    this.emitChange();
  },
  
  handlers: {
    'CHANGE_ROUTE_START': 'handleTimeChange',
    'UPDATE_TIME': 'handleTimeChange'
  },
  
  getState() {
    return { time: this.time.toString() };
  },
  
  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.time = new Date(state.time);
  }
});