/* global Intl */

// Add support for intl on node.js
// See: http://formatjs.io/guides/runtime-environments/#server

import { locales } from "../config";
import areIntlLocalesSupported from "intl-locales-supported";

const debug = require("debug")("isomorphic500");

console.log(!areIntlLocalesSupported(locales));

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(locales)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        require("intl");
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
        debug("Intl's Missing locales have been polyfilled");
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
    debug("Intl has been polyfilled");
}
