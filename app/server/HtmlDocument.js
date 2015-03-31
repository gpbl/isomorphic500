
import React, { PropTypes } from "react";
import webpackStats from "../webpack-stats.json";

class HtmlDocument extends React.Component {

  render() {

    if (process.env.NODE_ENV === "development") {
      // Do not cache webpack stats: the script file would change because the
      // hot module replacement is enabled in development
      delete require.cache[require.resolve("../webpack-stats.json")];
    }

    const { state, markup } = this.props;
    return (
      <html>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

          <script dangerouslySetInnerHTML={{__html: state}} />

          {
            /* include the main script compiled by webpack */
            webpackStats.main.map((src, k) => <script key={k} src={src} />)
          }

        </body>
      </html>
    );
  }

}

HtmlDocument.propTypes = {
  state: PropTypes.string.isRequired, // the exposed dehydrated state
  markup: PropTypes.string.isRequired // markup for the root node
};

export default HtmlDocument;
