import React, { Component, PropTypes } from "react";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

if (process.env.BROWSER) {
  require("../style/Page.scss");
}

export default class Page extends Component {

  static propTypes = {
    footer: PropTypes.bool
  }

  static defaultProps = {
    footer: true
  }

  render() {
    const { footer } = this.props;

    return (
      <div className="Page">
        <div className="Page-header">
          <NavBar />
        </div>

        <div className="Page-body">
          { this.props.children }
        </div>

        { footer &&
          <div className="Page-footer">
            <Footer />
          </div> }

      </div>
    );
  }

}
