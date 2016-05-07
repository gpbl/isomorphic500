
import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";
import Immutable from "immutable";

import Page from "../components/Page";

import NotFoundPage from "../containers/NotFoundPage";
import ErrorPage from "../containers/ErrorPage";
import LoadingPage from "../containers/LoadingPage";

import trackPageView from "../utils/trackPageView";

if (process.env.BROWSER) {
  require("../style/Root.scss");
}

// Wrap Root with the fluxible context.
@provideContext

// Wrap with fluxible-router's history handler (required for routing)
// This also passes `currentRoute` as prop to the component
@handleHistory

// Listen to HtmlHeadStore and pass the document title to the component
@connectToStores(["HtmlHeadStore"], context =>
  ({ documentTitle: context.getStore("HtmlHeadStore").getTitle() })
)

export default class Root extends Component {

  static propTypes = {

    // props coming from fluxible-router's handleHistory
    isNavigateComplete: PropTypes.bool,
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    }),

    // prop coming from HtmlHeadStore
    documentTitle: PropTypes.string

  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.props;

    if (prevProps.documentTitle !== documentTitle) {
      document.title = documentTitle;
    }

    if (!Immutable.is(prevProps.currentRoute, currentRoute)) {
      trackPageView(currentRoute.url);
    }
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;

    const Handler = currentRoute && currentRoute.handler;

    let content;

    if (currentNavigateError && currentNavigateError.statusCode === 404) {
      // This "not found" error comes from a page init actions (InitActions.js)
      // e.g. when a 500px API responds 404
      content = <NotFoundPage />;
    }
    else if (currentNavigateError) {
      // Generic error, usually always with statusCode 500
      content = <ErrorPage err={ currentNavigateError } />;
    }
    else if (!Handler) {
      // No handler: this is another case where a route is not found (e.g.
      // is not defined in the routes.js config)
      content = <NotFoundPage />;
    }
    else if (!isNavigateComplete) {
      // Render a loading page while waiting the route's action to finish
      content = <LoadingPage />;
    }
    else {
      // Render the Handler (aka the page) for the current route. The route params
      // (e.g. values from the URLs) are props being sent to the page component,
      // for example the `id` of a photo for the `PhotoPage` component.
      const params = currentRoute.params;
      content = <Handler {...params} />;
    }
    return (
      <Page footer={ isNavigateComplete }>
        { content }
      </Page>
    );
  }

}

