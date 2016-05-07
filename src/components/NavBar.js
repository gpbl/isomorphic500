import React, { PropTypes, Component } from "react";
import { connectToStores } from "fluxible-addons-react";
import { NavLink } from "fluxible-router";

import Logo from "../components/Logo";

import features from "../constants/features";
import LocaleSwitcher from "../components/LocaleSwitcher";
import { FormattedMessage } from "../utils/IntlComponents";

if (process.env.BROWSER) {
  require("../style/NavBar.scss");
}

@connectToStores([], context =>
  ({ route: context.getStore("RouteStore").getCurrentRoute() })
)
export default class NavBar extends Component {

  static PropTypes = {
    route: PropTypes.object.isRequired
  }

  render() {
    const { route } = this.props;
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
                  key={ feature }
                  className={ className }
                  routeName="featured"
                  navParams={ {feature: feature} }>
                  <FormattedMessage id={ `features.${feature}` } />
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
