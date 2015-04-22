import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import IntlMessageFormat from "intl-messageformat";

const SITE_NAME = "Isomorphic500";
const BASE_URL = "http://isomorphic500.herokuapp.com";

class HtmlHeadStore extends BaseStore {

  static storeName = "HtmlHeadStore"

  static handlers = {
    [Actions.SET_HTML_HEAD]: "onHtmlHeadSet",

    [Actions.CHANGE_ROUTE_START]: "onChangeRouteStart",
    [Actions.STATUS_404]: "on404Error",
    [Actions.STATUS_500]: "on500Error"

  }

  constructor(dispatcher) {
    super(dispatcher);
    this.siteName = SITE_NAME;
    this.initialize();
    this.currentUrl = null;
  }

  initialize() {
    this.title = this.formatMessage("meta.title");
    this.description = this.formatMessage("meta.description");
    this.images = [];
  }

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
      return "";
    }
    return `${BASE_URL}${route.url}`;
  }

  getImages() {
    return this.images;
  }

  formatMessage(message, values={}) {
    const store = this.dispatcher.getStore("IntlStore");
    const msg = new IntlMessageFormat(store.getMessage(message), store.getLocales());
    return msg.format(values);
  }

  onHtmlHeadSet(route) {

    switch (route.name) {

      case "photo":
        let store = this.dispatcher.getStore("PhotoStore");
        let photo = store.get(route.params.id);

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
        const featureName = this.formatMessage(`features.${route.params.feature}`);
        this.title = this.formatMessage("featured.documentTitle", {
          feature: featureName
        });
      break;

      default:
        // Just set the defaults
        this.initialize();
      break;
    }

    this.emitChange();
  }

  onChangeRouteStart() {
    this.title = this.formatMessage("meta.loadingTitle");
    this.emitChange();
  }

  on500Error() {
    this.title = this.formatMessage("meta.errorTitle");
    this.emitChange();
  }

  on404Error() {
    this.title = this.formatMessage("meta.notFoundTitle");
    this.emitChange();
  }


}

export default HtmlHeadStore;
