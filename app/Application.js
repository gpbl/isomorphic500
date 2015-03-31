import React, { PropTypes } from "react";

if (process.env.BROWSER) {
  require("./style/Application.scss");
}

class Application extends React.Component {
  render() {
    return <p>Hello, world</p>;
  }
}

export default Application;
