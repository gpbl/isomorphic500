import React, { Component } from "react";
import { NavLink } from "fluxible-router";

if (process.env.BROWSER) {
  require("../style/Footer.scss");
}

export default class Footer extends Component {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-disclaimer">
          Data from <a href="https://500px.com">500px</a>. Photos copyrights of their respective authors.
        </div>
        <div>
          <strong>isomorphic500</strong> is demo app built in <a href="https://facebook.github.io/react/">React</a> with <a href="http://www.fluxible.io">Fluxible</a>. See the <a href="https://github.com/gpbl/isomorphic500">project’s page</a> on Github or try something
          exciting: <NavLink className="Footer-link" routeName="bad">a bad route</NavLink> or <NavLink className="Footer-link" routeName="photo" navParams={ {id: 100000000000} }>an unexisting photo</NavLink>.
        </div>
      </div>
    );
  }

}
