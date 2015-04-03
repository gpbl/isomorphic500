
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

  changeRoute(payload) {
    if (this.currentRoute && this.currentRoute.url === payload.url) {
      return;
    }

    this.currentRoute = payload || {};

    this.err = null;
    this.currentRoute.isLoading = true;
    this.currentPageName = null;

    this.emitChange();
  }

  handleNavigate(payload) {

    if (payload.url !== this.currentRoute.url) {
      // too late! This may happen when a route action has been finished
      // after the route has changed again.
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

  status500(payload) {
    this.currentPageName = "500";
    this.err = payload.err;

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

  rehydrate(state) {
    this.err = state.err;
    this.currentRoute = state.currentRoute;
    this.currentPageName = state.currentPageName;
  }

}

export default RouteStore;
