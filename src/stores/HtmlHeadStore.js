import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import IntlMessageFormat from "intl-messageformat";

const SITE_NAME = "Isomorphic500";
const BASE_URL = "http://isomorphic500.herokuapp.com";

/*
This store listens to fluxible-router's actions and keep
the content for the <head> tag. Used in Html.js,
and Root.js (to change the document's title)
 */

export default class HtmlHeadStore extends BaseStore {

  static storeName = "HtmlHeadStore"

  static handlers = {
    [Actions.NAVIGATE_SUCCESS]: "handleNavigateSuccess",
    [Actions.NAVIGATE_FAILURE]: "handleNavigateFailure"
  }

  siteName = SITE_NAME
  currentUrl = null
  images = []
  title = ""
  description = ""

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getSiteName() {
    return this.siteName;
  }

  getCurrentUrl() {
    const route = this.dispatcher.getStore("RouteStore").getCurrentRoute();
    if (!route) {
      return BASE_URL;
    }
    return `${BASE_URL}${route.get("url")}`;
  }

  getImages() {
    return this.images;
  }

  // Used to get internationalized messages, has access to the IntlStore
  formatMessage(message, values={}) {
    const store = this.dispatcher.getStore("IntlStore");
    const msg = new IntlMessageFormat(store.getMessage(message), store.getLocales());
    return msg.format(values);
  }

  // Set the store content (images, description, title, etc.) according to the received route
  // Remember: route is an immutable object!

  handleNavigateSuccess(route) {

    switch (route.get("name")) {

    case "photo":

      const id = route.getIn(["params", "id"]);

      const store = this.dispatcher.getStore("PhotoStore");
      const photo = store.get(id);

      this.title = this.formatMessage("photo.documentTitle", {
        name: photo.name,
        user: photo.user.fullname
      });

      this.description = this.formatMessage("photo.documentDescription", {
        name: photo.name,
        user: photo.user.fullname
      });

      this.images = [photo.image_url];
      break;

    case "featured":
      const feature = route.getIn(["params", "feature"]);
      const featureName = this.formatMessage(`features.${feature}`);
      this.title = this.formatMessage("featured.documentTitle", {
        feature: featureName
      });
      this.description = "";
      this.images = [];
      break;

    default:
      // Just set the defaults
      this.title = this.formatMessage("meta.title");
      this.description = this.formatMessage("meta.description");
      this.images = [];
      break;

    }

    this.emitChange();
  }

  handleNavigateFailure(error) {
    if (error.statusCode === 404) {
      this.title = this.formatMessage("meta.notFoundTitle");
    }
    else {
      this.title = this.formatMessage("meta.errorTitle");
    }
    this.emitChange();
  }

}
