/* eslint react/no-danger: 0 */
import React, { PropTypes } from "react";

import { trackingId } from "../config";
import ga from "../server/ga";
import { provideContext, connectToStores } from "fluxible-addons-react";

const css = [];
const scripts = [];

if (process.env.NODE_ENV === "production") {
  // on production, include scripts and css from the webpack stats
  const config = require("../../webpack/prod.config");
  const stats = require("../../static/dist/stats.json");
  scripts.push(`${config.output.publicPath}${stats.main}`);
  css.push(`${config.output.publicPath}${stats.css}`);
}
else {
  // on development, use the webpack dev server config
  // css are not needed since they are injected inline with webpack
  const config = require("../../webpack/dev.config");
  scripts.push(`${config.output.publicPath}${config.output.filename}`);
}


@provideContext()
@connectToStores([], context => {
  const htmlHeadStore = context.getStore("HtmlHeadStore");
  return {
    title: htmlHeadStore.getTitle(),
    description: htmlHeadStore.getDescription(),
    siteName: htmlHeadStore.getSiteName(),
    currentUrl: htmlHeadStore.getCurrentUrl(),
    images: htmlHeadStore.getImages()
  };
})
export default class Html extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,

    // meta tags, title, etc.
    title: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    currentUrl: PropTypes.string,
    images: PropTypes.array
  }

  static defaultProps = {
    meta: {}
  }

  render() {
    const { state, content, lang } = this.props;
    const { title, description, siteName, currentUrl, images } = this.props;
    return (
      <html lang={ lang }>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

          <title>{ title }</title>

          <meta name="description" content={ description } />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={ siteName } />
          <meta property="og:title" content={ title } />
          <meta property="og:description" content={ description } />
          <meta property="og:url" content={ currentUrl } />

          { images.map(url => <meta property="og:image" content={ url } />) }

          { css.map((href, k) => <link key={ k } rel="stylesheet" type="text/css" href={ href } />) }

          { trackingId && <script dangerouslySetInnerHTML={ {__html: ga.replace("{trackingId}", trackingId)} } /> }

        </head>

        <body>
          <div id="content" dangerouslySetInnerHTML={ {__html: content} } />

          <script dangerouslySetInnerHTML={ {__html: state} } />

          { scripts.map((src, i) => <script src={ src } key={ i } />) }

        </body>
      </html>
    );
  }
}
