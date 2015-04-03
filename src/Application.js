import React, { PropTypes } from "react";
import { FluxibleMixin } from "fluxible";
import { RouterMixin } from "flux-router-component";
import DocumentTitle from 'react-document-title';

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

const Application = React.createClass({

  propTypes: {
    pageName: PropTypes.string,
    route: PropTypes.object
  },

  statics: {
    storeListeners: ["RouteStore"]
  },

  mixins: [FluxibleMixin, RouterMixin],

  getInitialState() {
    return this.getStateFromStores();
  },

  getStateFromStores() {
    const routeStore = this.getStore("RouteStore");
    return {
      pageName: routeStore.getCurrentPageName(),
      route: routeStore.getCurrentRoute(),
      err: routeStore.getNavigationError()
    };
  },

  onChange() {
    this.setState(this.getStateFromStores());
  },

  render() {
    const { pageName, route, err } = this.state;
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
        console.warn(`Missing route handler route with name ${route.name}`);
        RouteHandler = <NotFoundPage />;
      break;
    }

    return RouteHandler;
  }

});

export default Application;
