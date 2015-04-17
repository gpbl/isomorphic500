import React, { PropTypes } from "react";
import { isEqual } from "lodash";
import { provideContext, connectToStores } from "fluxible/addons";

import { RouterMixin } from "flux-router-component";

import Page from "./components/Page";

import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import PhotoPage from "./pages/PhotoPage";
import FeaturedPage from "./pages/FeaturedPage";

import trackPageView from "./utils/trackPageView";

const debug = require("debug")("isomorphic500");

if (process.env.BROWSER) {
  require("./style/Application.scss");
}

let Application = React.createClass({

  propTypes: {
    context: PropTypes.object.isRequired,
    pageName: PropTypes.string,
    route: PropTypes.object,
    err: PropTypes.object,
    documentTitle: PropTypes.string
  },

  // RouterMixin needs the route in the component state
  getInitialState() {
    return {
      route: this.props.route
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.route, nextProps.route)) {
      this.setState({
        route: nextProps.route
      });
    }
  },

  componentDidUpdate(prevProps) {
    const { documentTitle, route } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }

    if (!isEqual(route, prevProps.route)) {
      trackPageView();
    }
  },

  mixins: [RouterMixin],

  render() {
    const { pageName, route, err, isLoading } = this.props;
    return (
      <Page footer={!isLoading}>
        {
          pageName === "404" ?
            <NotFoundPage /> :

          pageName === "500" ?
            <ErrorPage err={err} /> :

          isLoading ?
            <LoadingPage /> :

          this.renderRoute(route)

        }
      </Page>
    );
  },

  renderRoute(route) {

    debug("Rendering route %s", route.url);

    let RouteHandler;

    switch (route.name) {
      case "featured":
      case "home":
        RouteHandler = FeaturedPage;
      break;
      case "photo":
        RouteHandler = PhotoPage;
      break;
      default:
        console.warn(`Missing handler for route with name ${route.name}`);
        RouteHandler = NotFoundPage;
      break;
    }

    return <RouteHandler {...route.params} />;
  }

});

Application = connectToStores(Application, ["RouteStore", "HtmlHeadStore"], (stores) => ({
    pageName: stores.RouteStore.getCurrentPageName(),
    route: stores.RouteStore.getCurrentRoute(),
    err: stores.RouteStore.getNavigationError(),
    isLoading: stores.RouteStore.isLoading(),
    documentTitle: stores.HtmlHeadStore.getTitle()
  })
);

// wrap application in the fluxible context
Application = provideContext(Application);

export default Application;
