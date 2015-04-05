/* global Intl, IntlPolyfill */

// Add support for intl on node.js
// See: http://formatjs.io/guides/runtime-environments/#server

import { locales } from "../config";

const debug = require("debug")("isomorphic500");

if (locales) {

  if (global.Intl) {

    // Determine if the built-in `Intl` has the locale data we need.
    const hasBuiltInLocaleData = locales.every((locale) => {
      Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
      Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
    });

    if (!hasBuiltInLocaleData) {
      debug("Intl has been found, but locale data has been polyfilled.");

      // `Intl` exists, but it doesn't have the data we need, so load the
      // polyfill and replace the constructors with need with the polyfill's.
      require("intl");
      Intl.NumberFormat = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
  }
  else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require("intl");
    debug("Intl is not supported, so the polyfill has been loaded.");
  }

}
