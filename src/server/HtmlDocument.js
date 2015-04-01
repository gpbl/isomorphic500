import React, { PropTypes } from "react";

class HtmlDocument extends React.Component {
  render() {
    const { state, markup, script, css } = this.props;
    return (
      <html>
        <head>
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

HtmlDocument.propTypes = {
  state: PropTypes.string.isRequired,
  markup: PropTypes.string.isRequired,
  script: PropTypes.arrayOf(PropTypes.string),
  css: PropTypes.arrayOf(PropTypes.string)
};

export default HtmlDocument;
