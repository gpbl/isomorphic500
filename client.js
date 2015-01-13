import React from 'react';
import i18nLoader from './i18n/loader';

const hasIntl = typeof (Intl) !== "undefined";
const lang = document.documentElement.getAttribute('lang');

require('./style/main.scss');

function renderApp() {

  i18nLoader(lang, function () {

    import app from './app';
    const dehydratedState = window.App;

    app.rehydrate(dehydratedState, function (err, context) {
      if (err) throw err;

      // enable hotLoader for i18n
      require('./i18n/hotLoader')(context.getComponentContext());

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

if (!hasIntl) {
  // shim Intl for browser not supporting it
  require.ensure(['intl/Intl'], (require) => {
    require('intl/Intl');
    renderApp();
  }, 'intl');
} else {
  renderApp();
}

