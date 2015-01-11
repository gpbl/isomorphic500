import React from 'react';
import ApplicationStore from '../stores/ApplicationStore';

const Html = React.createClass({

  propTypes: {
    context: React.PropTypes.object.isRequired, // fluxible context
    state: React.PropTypes.object.isRequired, // dehydrated state
    markup: React.PropTypes.string.isRequired, // content of mountNode
    mainScript: React.PropTypes.string.isRequired, // client entry file
    css: React.PropTypes.string.isRequired // inline css
  },

  render() {
    const { context, state, markup, mainScript, css } = this.props;
    const title = context.getStore(ApplicationStore).getPageTitle();
    // const title = "booh"
    return (
      <html>
        <title>{ title }</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <style id="server-side-style" dangerouslySetInnerHTML={{__html: css}} />
        <body>
          <div id="mountNode" dangerouslySetInnerHTML={{__html: markup}} />
          <script dangerouslySetInnerHTML={{__html: state}}></script>
          <script src={ mainScript }></script>
        </body>
      </html>
    );
  }

});

export default Html;