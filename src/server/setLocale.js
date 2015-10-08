// Express middleware to overwrite the locale from cookie or querystring

import config from "../config";

const debug = require("debug")("isomorphic500");

export default function setLocale(req, res, next) {
  debug("Detected locale (from browser) is %s", req.locale);

  // Locale can be changed by passing ?hl=<locale> in the querystring

  if (req.query.hl) {
    // But only the supported ones!
    if (config.locales.indexOf(req.query.hl) > -1) {
      req.locale = req.query.hl;
      debug("Locale has been set from querystring: %s", req.locale);
    }
  }

  // Or by setting a `hl` cookie
  else if (req.cookies.hl) {
    if (config.locales.indexOf(req.cookies.hl) > -1) {
      req.locale = req.cookies.hl;
      debug("Locale has been set from cookie: %s", req.locale);
    }
  }

  next();
}
