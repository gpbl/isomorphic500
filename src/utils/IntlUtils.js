// Contains utils to download the locale data for the current language, eventually
// requiring the `Intl` polyfill for browser not supporting it
// It is used in client.js *before* rendering the root component.

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
      // been download. Make sure to require `intl/Intl` and not just `intl`
      // otherwise webpack will require the *complete* intl package (with all
      // the locales)

      require.ensure(["intl/Intl"], (require) => {
        const IntlPolyfill = require("intl/Intl");

        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

        debug("Intl polyfill for %s has been loaded", locale);

        resolve();
      }, "intl");

    });

  },

  // Returns a promise which is resolved as the required locale-data chunks
  // has been downloaded with webpack's require.ensure. For each language,
  // we make two different chunks: one for browsers supporting `intl` and one
  // for those who don't.
  // The react-intl locale-data is required, for example, by the FormattedRelative
  // component.
  loadLocaleData(locale) {
    const hasIntl = IntlUtils.hasBuiltInLocaleData(locale);

    // Make sure ReactIntl is in the global scope: this is required for adding locale-data
    // Since ReactIntl needs the `Intl` polyfill to be required (sic) we must place
    // this require here, when loadIntlPolyfill is supposed to be present
    require("expose?ReactIntl!react-intl");

    return new Promise((resolve) => {

      switch (locale) {

        // italian
        case "it":

          if (!hasIntl) {

            require.ensure([
                "intl/locale-data/jsonp/it",
                "react-intl/dist/locale-data/it"
              ], (require) => {
              require("intl/locale-data/jsonp/it");
              require("react-intl/dist/locale-data/it");
              debug("Intl and ReactIntl locale-data for %s has been downloaded", locale);
              resolve();
            }, "locale-it");
          }
          else {
            require.ensure([
                "react-intl/dist/locale-data/it"
              ], (require) => {
              require("react-intl/dist/locale-data/it");
              debug("ReactIntl locale-data for %s has been downloaded", locale);
              resolve();
            }, "locale-it-no-intl");
          }

        break;

        // portugues
        case "pt":

          if (!hasIntl) {

            require.ensure([
                "intl/locale-data/jsonp/pt",
                "react-intl/dist/locale-data/pt"
              ], (require) => {

                require("intl/locale-data/jsonp/pt");
                debug("Intl locale-data for %s has been downloaded", locale);
                resolve();
              }, "locale-pt");
            }
            else {
              require.ensure([
                  "react-intl/dist/locale-data/pt"
                ], (require) => {
                require("react-intl/dist/locale-data/pt");
                debug("ReactIntl locale-data for %s has been downloaded", locale);
                resolve();
              }, "locale-pt-no-intl");
            }
        break;

        // english
        default:
          if (!hasIntl) {
            require.ensure([
                "intl/locale-data/jsonp/en"
              ], (require) => {

              require("intl/locale-data/jsonp/en");
              debug("Intl locale-data for %s has been downloaded", locale);
              resolve();
            }, "locale-en");
          }
          else {
            resolve();
          }

      }

    });

  }

};

export default IntlUtils;
