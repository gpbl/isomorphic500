import React from 'react';
import app from './app';

const dehydratedState = window.App;

app.rehydrate(dehydratedState, function (err, context) {
  if (err) throw err;
  window.context = context;
  const AppComponent = app.getAppComponent();
  React.render(
    AppComponent({ 
      context: context.getComponentContext() 
    }), 
    document.getElementById('mountNode'), 
    () => { console.log('Application rendered on mountNode.'); }
  );
});