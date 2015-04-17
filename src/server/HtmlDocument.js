import React, { PropTypes } from "react";

import { trackingId } from "../config";
import ga from "./ga";
import { provideContext } from "fluxible/addons";

class HtmlDocument extends React.Component {

  static propTypes = {
    context: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    script: [],
    css: []
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const { state, markup, script, css, lang } = this.props;
    const htmlHead = this.context.getStore("HtmlHeadStore");

    return (
      <html lang={lang}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

          <title>{ htmlHead.getTitle() }</title>

          <meta name="description" content={ htmlHead.getDescription() } />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={ htmlHead.getSiteName() } />
          <meta property="og:title" content={ htmlHead.getTitle() } />
          <meta property="og:description" content={ htmlHead.getDescription() } />
          <meta property="og:url" content={ htmlHead.getCurrentUrl() } />

          { htmlHead.getImages().map(url => <meta property="og:image" content={ url } />) }

          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
          }

          { trackingId &&
            <script dangerouslySetInnerHTML={{__html: ga.replace("{trackingId}", trackingId)}} />
          }

        </head>

        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

          <script dangerouslySetInnerHTML={{__html: state}} />

          { script.map((src, k) => <script key={k} src={src} />) }

        </body>
      </html>
    );
  }
}

HtmlDocument = provideContext(HtmlDocument);

export default HtmlDocument;
