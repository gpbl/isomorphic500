
import Fluxible from "fluxible/addons";
import Actions from "../constants/Actions";

class RouteStore extends Fluxible.BaseStore {

  static storeName = "RouteStore"

  static handlers = {
    [Actions.CHANGE_ROUTE_SUCCESS]: "handleNavigate",
    [Actions.CHANGE_ROUTE_START]: "changeRoute",
    [Actions.STATUS_404]: "status404",
    [Actions.STATUS_500]: "status500"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.currentRoute = null;
    this.currentPageName = null;
    this.err = null;
  }

  changeRoute(route) {

    if (this.currentRoute && this.currentRoute.url === route.url) {
      // Do nothing if trying to change to the same route
      return;
    }

    this.currentRoute = route || {};

    this.err = null;
    this.currentRoute.isLoading = true;
    this.currentPageName = null;

    this.emitChange();
  }

  handleNavigate(route) {

    if (route.url !== this.currentRoute.url) {
      // Too late! This may happen when a route action has been finished
      // to load, but the route did change again.
      return;
    }

    this.currentPageName = null;
    this.err = null;
    this.currentRoute.isLoading = false;

    this.emitChange();
  }

  status404() {
    this.currentPageName = "404";

    if (this.currentRoute) {
      this.currentRoute.isLoading = false;
    }

    this.emitChange();
  }

  status500({ err }) {
    this.err = err;
    this.currentPageName = "500";

    if (this.currentRoute) {
      this.currentRoute.isLoading = false;
    }

    this.emitChange();
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  getCurrentPageName() {
    return this.currentPageName;
  }

  getNavigationError() {
    return this.err;
  }

  dehydrate() {
    return {
      err: this.err,
      currentRoute: this.currentRoute,
      currentPageName: this.currentPageName
    };
  }

  rehydrate({ err, currentRoute, currentPageName }) {
    this.err = err;
    this.currentRoute = currentRoute;
    this.currentPageName = currentPageName;
  }

}

export default RouteStore;
