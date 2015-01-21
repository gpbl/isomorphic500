import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';
import { last } from 'lodash';

const Html = React.createClass({

  propTypes: {
    context: React.PropTypes.object.isRequired, // fluxible context
    locale: React.PropTypes.string.isRequired, // dehydrated state
    state: React.PropTypes.string.isRequired, // dehydrated state
    markup: React.PropTypes.string.isRequired, // content of mountNode
  },

  render() {
    const { locale, context, state, markup } = this.props;
    const title = context.getStore(ApplicationStore).getPageTitle();

    import webpackStats from '../server/webpack-stats.json';
    if(process.env.NODE_ENV === 'development') 
      // do not cache webpack stats (useful for hot reload)
      delete require.cache[require.resolve('../server/webpack-stats.json')];

    return (
      <html lang={ locale }>
        <head>
          <title>{ title }</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          { 
            webpackStats.mainChunks.map((chunkName, i) => {
              if (last(chunkName.split('.')) === 'css') {
                const href = `${webpackStats.publicPath}${chunkName}`;
                return <link key={i} rel="stylesheet"  type="text/css" href={ href } />;
              }
            })
          }
        </head>
        <body>
          <div id="mountNode" dangerouslySetInnerHTML={{__html: markup}} />
          <script dangerouslySetInnerHTML={{__html: state}}></script>
          { 
            webpackStats.mainChunks.map((chunkName, i) => {
              if (last(chunkName.split('.')) === 'js') {
                const src = `${webpackStats.publicPath}${chunkName}`;
                return <script key={i} src={src} />;
              }
            })
          }
        </body>
      </html>
    );
  }

});

export default Html;