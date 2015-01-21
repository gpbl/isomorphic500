import React from 'react';
import i18nLoader from './i18n/loader';
import i18nHotReload from './i18n/hotReload';
import app from './app';

require('./style/main.scss');

function renderApp() {

  const lang = document.documentElement.getAttribute('lang');

  i18nLoader(lang, function () {

    const dehydratedState = window.App;

    app.rehydrate(dehydratedState, function (err, context) {
      if (err) throw err;

      // enable hotLoader for i18n
      if (process.env.NODE_ENV === 'development')
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

// intl stuff
import IntlMessageFormat from 'intl-messageformat';
window.IntlMessageFormat = IntlMessageFormat;

// load IntlPolyfill for intl-messageformat
require.ensure(['intl/Intl'], (require) => {
  var IntlPolyfill = require('intl/Intl');
  window.IntlPolyfill = IntlPolyfill;
  renderApp();
}, 'intl');
