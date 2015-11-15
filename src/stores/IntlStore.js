import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import getIntlMessage from "../utils/getIntlMessage";

class IntlStore extends BaseStore {

  static storeName = "IntlStore"

  static handlers = {}

  messages = {}
  locales = []
  currentLocale = null

  getMessages() {
    return this.messages;
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

  handleLoad({ messages, locales }) {
    this.messages = messages;
    this.locales = locales;
    this.currentLocale = locales[0];
    this.emitChange();
  }

  dehydrate() {
    return {
      currentLocale: this.currentLocale,
      locales: this.locales,
      messages: this.messages
    };
  }

  rehydrate({ messages, locales, currentLocale }) {
    this.messages = messages;
    this.locales = locales;
    this.currentLocale = currentLocale;
  }
}

// This action is dispatched only on the server
if (!process.env.BROWSER) {
  IntlStore.handlers[Actions.LOAD_INTL_SERVER] = "handleLoad";
}

export default IntlStore;
