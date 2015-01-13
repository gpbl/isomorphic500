// loader for locale data (moment and intl)
// 
// Explicit require.ensure() will make webpack split locale chunks
// (not sure if there's a better way)
// 
// The loader is called from ./client.js and ./actions/getI18n.js

import moment from 'moment';

const hasIntl = typeof(Intl) !== "undefined";
const loaders = {};

// load italian
loaders.it = function(done) {
  
  if (!hasIntl)
    require.ensure([
      'intl/locale-data/jsonp/it.js',
      'moment/locale/it.js'
    ], (require) => {
      require('intl/locale-data/jsonp/it.js');
      require('moment/locale/it.js');
      done();
    }, 'intl-it');
  
  else 
    require.ensure([
      'moment/locale/it.js'
    ], (require) => {
      require('moment/locale/it.js');
      done();
    }, 'it');
  
}

// load english
loaders.en = function(done) {

  if (!hasIntl)
    require.ensure([
      'intl/locale-data/jsonp/en.js'
      // no need to load moment locale for en
    ], (require) => {
      require('intl/locale-data/jsonp/en.js');
      done();
    }, 'intl-en');
  
  else
    done();

}

// load i18n data for the given locale
export default function (locale, done) {
  function setMomentLocale() {
    moment.locale(locale);
    done();
  }
  loaders[locale](setMomentLocale);
}