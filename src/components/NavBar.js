import React from "react";
import Logo from "../components/Logo";
import { NavLink } from "flux-router-component";
import { connectToStores } from "fluxible/addons";

import features from "../constants/features";
import LocaleSwitcher from "../components/LocaleSwitcher";
import FormattedMessage from "../utils/FormattedMessage";

if (process.env.BROWSER) {
  require("../style/NavBar.scss");
}

class NavBar extends React.Component {

  render() {
    const { currentFeature } = this.props;
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

              return <NavLink
                  key={feature}
                  className={className}
                  routeName="featured"
                  navParams={{feature: feature}}>
                  <FormattedMessage message={`features.${feature}`} />
                </NavLink>;
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

NavBar = connectToStores(NavBar, ["RouteStore"], {
  RouteStore: (store) => {
    const route = store.getCurrentRoute();
    return { currentFeature: route ? route.params.feature : null };
  }
});

export default NavBar;
