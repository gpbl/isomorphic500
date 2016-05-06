// Contains utils to download the locale data for the current language, eventually
// requiring the `Intl` polyfill for browser not supporting it
// It is used in client.js *before* rendering the root component.

import { addLocaleData } from "react-intl";
import isIntlLocaleSupported from "intl-locales-supported";

const debug = require("debug")("isomorphic500");

const IntlUtils = {

  // Returns a promise which is resolved when Intl has been polyfilled

  loadIntlPolyfill(locale) {

    if (window.Intl && isIntlLocaleSupported(locale)) {
      // all fine: Intl is in the global scope and the locale data is available
      return Promise.resolve();
    }

    return new Promise(resolve => {
      debug("Intl or locale data for %s not available, downloading the polyfill...", locale);

      // When building: create a intl chunk with webpack
      // When executing: run the callback once the chunk has been download.
      require.ensure(["intl"], require => {
        require("intl"); // apply the polyfill
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
    const hasIntl = isIntlLocaleSupported(locale);

    // Make sure ReactIntl is in the global scope: this is required for adding locale-data
    // Since ReactIntl needs the `Intl` polyfill to be required (sic) we must place
    // this require here, when loadIntlPolyfill is supposed to be present
    require("expose?ReactIntl!react-intl");

    return new Promise(resolve => {

      switch (locale) {

      // italian
      case "it":

        if (!hasIntl) {

          require.ensure([
            "intl/locale-data/jsonp/it",
            "react-intl/locale-data/it"
          ], require => {
            require("intl/locale-data/jsonp/it");
            addLocaleData(require("react-intl/locale-data/it"));
            debug("Intl and ReactIntl locale-data for %s has been downloaded", locale);
            resolve();
          }, "locale-it");
        }
        else {
          require.ensure([
            "react-intl/locale-data/it"
          ], require => {
            addLocaleData(require("react-intl/locale-data/it"));
            debug("ReactIntl locale-data for %s has been downloaded", locale);
            resolve();
          }, "locale-it-no-intl");
        }

        break;

      // french
      case "fr":

        if (!hasIntl) {
          require.ensure([
            "intl/locale-data/jsonp/fr",
            "react-intl/locale-data/fr"
          ], require => {
            require("intl/locale-data/jsonp/fr");
            addLocaleData(require("react-intl/locale-data/fr"));
            debug("Intl and ReactIntl locale-data for %s has been downloaded", locale);
            resolve();
          }, "locale-fr");
        }
        else {
          require.ensure([
            "react-intl/locale-data/fr"
          ], require => {
            addLocaleData(require("react-intl/locale-data/fr"));
            debug("ReactIntl locale-data for %s has been downloaded", locale);
            resolve();
          }, "locale-fr-no-intl");
        }

        break;

      // portugues
      case "pt":

        if (!hasIntl) {
          require.ensure([
            "intl/locale-data/jsonp/pt",
            "react-intl/locale-data/pt"
          ], require => {
            require("intl/locale-data/jsonp/pt");
            addLocaleData(require("react-intl/locale-data/pt"));
            debug("Intl locale-data for %s has been downloaded", locale);
            resolve();
          }, "locale-pt");
        }
        else {
          require.ensure([
            "react-intl/locale-data/pt"
          ], require => {
            addLocaleData(require("react-intl/locale-data/pt"));
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
          ], require => {
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
