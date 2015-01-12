import React from 'react';
import FluxibleApp from 'fluxible-app';
import routrPlugin from 'fluxible-plugin-routr';

import Application from './components/Application.jsx';

const fluxibleApp = new FluxibleApp({
  appComponent: React.createFactory(Application)
});

fluxibleApp.plug(routrPlugin({
  routes: require('./config/routes')
}));

fluxibleApp.registerStore(require('./stores/ApplicationStore'));
fluxibleApp.registerStore(require('./stores/TimeStore'));
fluxibleApp.registerStore(require('./stores/PageStore'));
fluxibleApp.registerStore(require('./stores/PhotosStore'));

export default fluxibleApp;