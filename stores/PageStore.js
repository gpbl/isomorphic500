import createStore from 'fluxible-app/utils/createStore';

export default createStore({

  storeName: 'PageStore',

  initialize(dispatcher) {
    this.content = 'Initial content...';
  },
  
  handleContentChange(payload) {
    this.content = 'Content for page with id ' + payload.id;
    this.emitChange();
  },
  
  handlers: {
    'LOAD_PAGE': 'handleContentChange'
  },
  
  getState() {
    return { content: this.content };
  },
  
  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.content = state.content;
  }

});