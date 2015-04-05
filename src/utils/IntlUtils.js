const debug = require("debug")("isomorphic500");

const IntlUtils = {

  hasBuiltInLocaleData(locale) {
    return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
      Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
  },

  // Returns a promise which is resolved when Intl chunk has been
  // downloaded and required
  loadIntlPolyfill(locale) {

    return new Promise((resolve) => {

      if (window.Intl && IntlUtils.hasBuiltInLocaleData(locale)) {
        // all fine: Intl is in the global scope and the locale data is available
        return resolve();
      }

      debug("Intl or locale data for %s not available, downloading the polyfill...", locale);

      // Create a intl chunk with webpack and run the callback once it has
      // been download

      require.ensure(["intl"], (require) => {
        const IntlPolyfill = require("intl");

        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

        debug("Intl polyfill for %s has been loaded", locale);
        resolve();
      }, "intl");

    });

  },

  // Returns a promise which is resolved when locale datas chunks
  // has been downloaded and required
  loadLocaleData(locale) {

    return new Promise((resolve) => {

      if (IntlUtils.hasBuiltInLocaleData(locale)) {
        debug("Locale data for %s is already available", locale);
        return resolve();
      }

      if (locale === "it") {
        require.ensure(["intl/locale-data/jsonp/it"], (require) => {
          require("intl/locale-data/jsonp/it");
          debug("Locale data for %s has been downloaded", locale);
          resolve();
        }, "locale-it");
      }

      else {
        // english is the fallback
        require.ensure(["intl/locale-data/jsonp/en"], (require) => {
          require("intl/locale-data/jsonp/en");
          debug("Locale data for %s has been downloaded", locale);
          resolve();
        }, "locale-en");
      }

    });

  }

};

export default IntlUtils;
