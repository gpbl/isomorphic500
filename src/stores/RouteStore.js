
import Fluxible from "fluxible/addons";
import Actions from "../constants/Actions";

class RouteStore extends Fluxible.BaseStore {

  constructor(dispatcher) {
    super(dispatcher);
    this.currentRoute = null;
    this.currentPageName = null;
    this.err = null;
  }

  changeRoute(payload) {
    this.currentRoute = payload;
    this.currentRoute.isLoading = true;
    this.emitChange();
  }

  handleNavigate() {
    this.currentPageName = null;
    this.currentRoute.isLoading = false;
    this.emitChange();
  }

  status404() {
    this.currentPageName = "404";
    this.emitChange();
  }

  status500(payload) {
    this.currentPageName = "500";
    this.err = payload.err;
    this.emitChange();
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  getCurrentPageName() {
    return this.currentPageName;
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

RouteStore.storeName = "RouteStore";
RouteStore.handlers = {
  [Actions.CHANGE_ROUTE_SUCCESS]: "handleNavigate",
  [Actions.CHANGE_ROUTE_START]: "changeRoute",
  [Actions.STATUS_404]: "status404",
  [Actions.STATUS_500]: "status500"
};

export default RouteStore;
