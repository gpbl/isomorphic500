import React, { PropTypes, Component } from "react";
import Logo from "../components/Logo";
import { NavLink } from "flux-router-component";

import features from "../constants/features";
import LocaleSwitcher from "../components/LocaleSwitcher";
import FormattedMessage from "../utils/FormattedMessage";

if (process.env.BROWSER) {
  require("../style/NavBar.scss");
}

class NavBar extends Component {

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  render() {
    const route = this.context.getStore("RouteStore").getCurrentRoute();
    const currentFeature = route ? route.params.feature : null;

    return (
      <div className="NavBar">
        <div className="NavBar-title">
          <NavLink href="/">
            <Logo />
          </NavLink>
        </div>
        <div className="NavBar-links">
          {
            features.map(feature => {
              let className = "NavBar-link";

              if (currentFeature === feature) {
                className = `${className} ${className}--selected`;
              }

              return (
                <NavLink
                  key={feature}
                  className={className}
                  routeName="featured"
                  navParams={{feature: feature}}>
                  <FormattedMessage message={`features.${feature}`} />
                </NavLink>
              );
            })
          }
        </div>
        <div className="NavBar-locales">
          <LocaleSwitcher />
        </div>
      </div>
    );
  }

}

export default NavBar;
