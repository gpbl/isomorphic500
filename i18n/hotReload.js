// hot reload i18n files
// (files must be added by hand here)
if (module.hot) {
  export default function(context) {
    
    import I18nStore from '../stores/I18nStore';
    import getI18n from '../actions/getI18n';

    require('./en');
    require('./it');
    
    module.hot.accept(['./en', './it'], function () {
      const store = context.getStore(I18nStore);
      
      context.executeAction(getI18n, {
        locale: store.currentLocale
      });

      require('./en');
      require('./it');
    
    });
  }

}