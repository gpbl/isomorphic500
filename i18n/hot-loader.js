if (module.hot) {
  import I18nStore from '../stores/I18nStore';
  import getI18n from '../actions/getI18n';
  require('./en');
  require('./it');
  module.hot.accept(['./en', './it'], function () {
    const store = context.getComponentContext().getStore(I18nStore);
    window.context.executeAction(getI18n, {
      locale: store.currentLocale
    });
    require('./en');
    require('./it');
  });
}