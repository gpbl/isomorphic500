import React from 'react';

import i18nLoader from './i18n/loader';
import i18nHotReload from './i18n/hotReload';

require('./style/main.scss');

function renderApp() {

  const lang = document.documentElement.getAttribute('lang');

  i18nLoader(lang, function () {

    import app from './app';
    const dehydratedState = window.App;

    app.rehydrate(dehydratedState, function (err, context) {
      if (err) throw err;

      // enable hotLoader for i18n
      i18nHotReload(context.getComponentContext());

      window.context = context;
      const AppComponent = app.getAppComponent();

      React.render(
        AppComponent({
          context: context.getComponentContext()
        }),
        document.getElementById('mountNode'), () => {
          console.log('Application rendered on mountNode.');
        }
      );

    });

  });

}

// shim Intl for browser not supporting it
if (typeof (Intl) === 'undefined') {
  require.ensure(['intl/Intl'], (require) => {
    require('intl/Intl');
    renderApp();
  }, 'intl');
} else {
  renderApp();
}