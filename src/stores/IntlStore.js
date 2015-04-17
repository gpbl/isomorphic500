import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import getIntlMessage from "../utils/getIntlMessage";

class IntlStore extends BaseStore {

  static storeName = "IntlStore"

  static handlers = {
    [Actions.LOAD_INTL]: "onLoad",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.messages = {};
    this.locales = [];
    this.currentLocale = null;
  }

  onLoad({ messages, locales }) {
    this.messages = messages;
    this.locales = locales;
    this.currentLocale = locales[0];
    this.emitChange();
  }

  getState() {
    return {
      messages: this.messages,
      locales: this.locales,
      currentLocale: this.currentLocale
    };
  }

  getMessage(path) {
    return getIntlMessage(this.messages, path);
  }

  getLocales() {
    return this.locales;
  }

  getCurrentLocale() {
    return this.currentLocale;
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate({ messages, locales, currentLocale }) {
    this.messages = messages;
    this.locales = locales;
    this.currentLocale = currentLocale;
  }
}

export default IntlStore;
