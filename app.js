import React from 'react';
import fluxibleApp from 'fluxible-app';
import routrPlugin from 'fluxible-plugin-routr';
import fetchrPlugin from 'fluxible-plugin-fetchr';

import Application from './components/Application.jsx';

const app = new fluxibleApp({
  appComponent: React.createFactory(Application)
});

app.plug(routrPlugin({ routes: require('./config/routes') }));
app.plug(fetchrPlugin({ xhrPath: '/api' }));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/TimeStore'));
app.registerStore(require('./stores/PageStore'));
app.registerStore(require('./stores/PhotosStore'));
app.registerStore(require('./stores/I18nStore'));

export default app;