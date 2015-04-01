import React, { PropTypes } from "react";
import connectToStores from "./utils/connectToStores";

import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";

if (process.env.BROWSER) {
  require("./style/Application.scss");
}

const debug = require("debug")("isomorphic500");

class Application extends React.Component {

  render() {
    const { pageName, route } = this.props;
    return (
      <div>
          {
            pageName === "404" ?
              <NotFoundPage /> :

            pageName === "500" ?
              <ErrorPage /> :

            route.isLoading ?
              <LoadingPage /> :

            this.renderRoute(this.props)
          }
      </div>
    );
  }

  renderRoute() {
    const { route } = this.props;
    debug("Rendering '%s' route", route.name);
    let PageComponent;

    switch (route.name) {
      case "home":
        PageComponent = HomePage;
      break;
    }

    return <PageComponent />;

  }

}

Application.propTypes = {
  pageName: PropTypes.string,
  route: PropTypes.object
};

Application = connectToStores(Application, ["RouteStore"], (routeStore) => {
  return {
    pageName: routeStore.getCurrentPageName(),
    route: routeStore.getCurrentRoute()
  };
});

export default Application;
