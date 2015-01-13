// store for getting i18n data
export default {
  name: 'i18n',
  read(req, resource, params, config, callback) {
    try {
      const i18n = require(`../i18n/${params.locale}.js`);
      callback(null, i18n);
      if (process.env.NODE_ENV === 'development')
        delete require.cache[require.resolve(`../i18n/${params.locale}.js`)];
    }
    catch(e) { callback(e); }
  }

};