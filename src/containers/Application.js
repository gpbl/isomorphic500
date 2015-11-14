
import React, { PropTypes, Component } from "react";
import { provideContext, connectToStores } from "fluxible-addons-react";
import { handleHistory } from "fluxible-router";
import Immutable from "immutable";

import Page from "../containers/Page";
import NotFound from "../components/NotFound";
import ErrorDetail from "../components/ErrorDetail";

import trackPageView from "../utils/trackPageView";

if (process.env.BROWSER) {
  require("../style/Application.scss");
}

// Wrap with the fluxible context.
@provideContext

// Wrap with fluxible-router's history handler (required for routing)
// This also passes `currentRoute` as prop to the component
@handleHistory

// Listen to HtmlHeadStore and pass the document title to the component
@connectToStores(["HtmlHeadStore", "RouteStore"], context => ({
  documentTitle: context.getStore("HtmlHeadStore").getTitle(),
  currentNavigate: context.getStore("RouteStore").getCurrentNavigate(),
  currentFeature: context.getStore("FeaturedStore").getCurrentFeature()
}))

export default class Application extends Component {

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

  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentWillReceiveProps(nextProps) {

    // When the next route is still loading, we don't render it yet - beside
    // the loading status or when rendering the `photo` route (where we want
    // to display the blurred background)
    if (!this.props.currentNavigateError && nextProps.currentRoute && !nextProps.isNavigateComplete && nextProps.currentRoute.get("name") !== "photo") {
      this.setState({
        currentNavigate: nextProps.currentNavigate,
        isNavigateComplete: false
      });
      return;
    }

    // If the next route is set to display in a modal, keep the current state
    // and put the router's props in a different object. This way we can keep
    // the previous route visible and display the next one in a modal.
    if (nextProps.currentNavigate.openInModal) {
      this.setState({
        modalRouterState: {...nextProps }
      });
      return;
    }

    // Otherwise, just render the next route
    this.setState({
      ...nextProps,
      modalRouterState: null
    });
  }

  componentDidUpdate(prevProps) {
    const { documentTitle, currentRoute } = this.state;

    document.title = documentTitle;

    if (currentRoute && !Immutable.is(prevProps.currentRoute, currentRoute)) {
      trackPageView(currentRoute.get("url"));
    }
  }

  renderContent(routerState) {
    const { currentRoute, currentNavigateError } = routerState;

    const Handler = currentRoute && currentRoute.get("handler");

    let content;
    let statusCode = Handler ? 200 : 404;
    if (currentNavigateError) {
      statusCode = currentNavigateError.statusCode
    }

    switch (statusCode) {
    case 200:
      const params = currentRoute.get("params").toJS();
      content = <Handler {...params} />;
      break;
    case 404:
      content = <NotFound />;
      break;
    default:
      content = <ErrorDetail err={ currentNavigateError } />;
      break;
    }
    return content;
  }


  render() {

    const {
      modalRouterState,
      isNavigateComplete,
      currentNavigate
    } = this.state;

    return (
      <Page
        currentFeature={ this.props.currentFeature }
        loadingUrl={ !isNavigateComplete && currentNavigate.url }
        modalContent={ modalRouterState && this.renderContent(modalRouterState) }>

        { this.renderContent(this.state) }

      </Page>
    );
  }

}

