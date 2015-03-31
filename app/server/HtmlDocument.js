import React, { PropTypes } from "react";

class HtmlDocument extends React.Component {
  render() {
    const { state, markup, scripts } = this.props;
    return (
      <html>
        <body>
          <div id="root" dangerouslySetInnerHTML={{__html: markup}} />

          <script dangerouslySetInnerHTML={{__html: state}} />

          { scripts.map((src, k) => <script key={k} src={src} />) }

        </body>
      </html>
    );
  }
}

HtmlDocument.propTypes = {
  state: PropTypes.string.isRequired, // the exposed dehydrated state
  markup: PropTypes.string.isRequired, // markup for the root node
  scripts: PropTypes.arrayOf(PropTypes.string)
};

export default HtmlDocument;
