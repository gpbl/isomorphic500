import createStore from 'fluxible-app/utils/createStore';

export default createStore({
  storeName: 'I18nStore',

  handlers: {
    'RECEIVE_INTL_SUCCESS': 'updateLocale',
    'RECEIVE_INTL_FAILURE': 'handleReceiveFailure'
  },
  
  initialize(dispatcher) {
    this.locales = [];
    this.messages = {};
  },
  
  updateLocale(i18n) {
    this.locales = i18n.locales;
    this.messages = i18n.messages;
    this.emitChange();
  },

  handleReceiveFailure(payload) {
    console.warn('Cannot load i18n data for', {
      payload: payload
    });
  },

  getState() {
    return {
      locales: this.locales,
      messages: this.messages
    };
  },

  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.locales = state.locales;
    this.messages = state.messages;
  }

});
