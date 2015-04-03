import React from 'react';
import Logo from '../components/Logo';
import { NavLink } from 'flux-router-component';

import features from '../constants/features';
import connectToStores from "../utils/connectToStores";

if (process.env.BROWSER) {
  require('../style/NavBar.scss');
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
                  { feature }
                </NavLink>;
            })
          }
        </div>
      </div>
    );
  }

}

NavBar = connectToStores(NavBar, ["RouteStore"], (routeStore, props) => {
  const route = routeStore.getCurrentRoute();
  return {
    currentFeature: route ? route.params.feature : null
  }
})

export default NavBar;
