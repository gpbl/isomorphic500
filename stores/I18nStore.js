import createStore from 'fluxible/utils/createStore';

import actions from '../actions';

export default createStore({
  storeName: 'I18nStore',

  handlers: {
    [actions.RECEIVE_I18N_SUCCESS]: 'updateLocale',
    [actions.RECEIVE_I18N_FAILURE]: 'handleReceiveFailure'
  },
  
  initialize(dispatcher) {
    this.locales = [];
    this.messages = {};
    this.currentLocale = null;
  },
  
  updateLocale(data) {
    this.locales = data.locales;
    this.messages = data.messages;
    this.currentLocale = data.currentLocale;
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
      messages: this.messages,
      currentLocale: this.currentLocale
    };
  },

  dehydrate() {
    return this.getState();
  },
  
  rehydrate(state) {
    this.locales = state.locales;
    this.messages = state.messages;
    this.currentLocale = state.currentLocale
  }

});
