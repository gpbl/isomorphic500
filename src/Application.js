import React, { PropTypes } from "react";
import { provideContext, connectToStores } from "fluxible/addons";

import { RouterMixin } from "flux-router-component";
import DocumentTitle from "react-document-title";

import Page from "./components/Page";

import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import PhotoPage from "./pages/PhotoPage";
import FeaturedPage from "./pages/FeaturedPage";

const debug = require("debug")("isomorphic500");

if (process.env.BROWSER) {
  require("./style/Application.scss");
  require("./style/Loader.scss");
}

let Application = React.createClass({

  propTypes: {
    context: PropTypes.object.isRequired,
    pageName: PropTypes.string,
    route: PropTypes.object,
    err: PropTypes.object
  },

  // RouterMixin needs the route in the component state
  getInitialState() {
    return {
      route: this.props.route
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.route.url !== nextProps.route.url) {
      this.setState({
        route: nextProps.route
      });
    }
  },

  mixins: [RouterMixin],

  render() {
    const { pageName, route, err } = this.props;
    return (
      <DocumentTitle title="isomorphic500">
        <Page>
          {
            pageName === "404" ?
              <NotFoundPage /> :

            pageName === "500" ?
              <ErrorPage err={err} /> :

            route.isLoading ?
              <DocumentTitle title="Page is loading...">
                <div className="Loader" />
              </DocumentTitle> :

            this.renderRoute(route)

          }
        </Page>
      </DocumentTitle>
    );
  },

  renderRoute(route) {

    debug("Rendering route %s", route.url);

    let RouteHandler;

    switch (route.name) {
      case "featured":
      case "home":
        RouteHandler = <FeaturedPage />;
      break;
      case "photo":
        RouteHandler = <PhotoPage id={route.params.id} />;
      break;
      default:
        console.warn(`Missing handler for route with name ${route.name}`);
        RouteHandler = <NotFoundPage />;
      break;
    }

    return RouteHandler;
  }

});

Application = connectToStores(Application, ["RouteStore"], {
  RouteStore: (store) => ({
    pageName: store.getCurrentPageName(),
    route: store.getCurrentRoute(),
    err: store.getNavigationError()
  })
});

// wrap application in the fluxible context
Application = provideContext(Application);

export default Application;
