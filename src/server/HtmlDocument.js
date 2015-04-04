import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";

class HtmlDocument extends React.Component {

  static propTypes = {
    state: PropTypes.string.isRequired,
    markup: PropTypes.string.isRequired,
    script: PropTypes.arrayOf(PropTypes.string),
    css: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    state: "",
    markup: "",
    script: [],
    css: []
  }

  render() {
    const { state, markup, script, css } = this.props;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <title>{ DocumentTitle.rewind() }</title>
          { css.map((href, k) =>
            <link key={k} rel="stylesheet" type="text/css" href={href} />)
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

export default HtmlDocument;
