import React from "react";

if (process.env.BROWSER) {
  require("../style/Loader.scss");
  require("../style/Animate.scss");
}

export default class LoadingPage extends React.Component {

  render() {
    return <div className="Loader Animate--slow Animate-fadeIn" />;
  }

}
