import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import routrPlugin from "fluxible-plugin-routr";
import RouteActionCreators from "./actions/RouteActionCreators";
import routes from "./routes";

import Application from "./Application";

import FeaturedStore from "./stores/FeaturedStore";
import HtmlHeadStore from "./stores/HtmlHeadStore";
import IntlStore from "./stores/IntlStore";
import PhotoStore from "./stores/PhotoStore";
import RouteStore from "./stores/RouteStore";

const app = new Fluxible({

  component: Application,

  componentActionHandler(context, { err }, done) {

    // This action handler is called for any action executed in the component's
    // context. It's the right place to intercept action errors and display an
    // error page.

    if (err) {
      const { status, statusCode } = err;

      if (status && status === 404 || statusCode && statusCode === 404) {
        context.executeAction(RouteActionCreators.show404, { err }, done);
      }
      else {
        console.log(err.stack || err);
        context.executeAction(RouteActionCreators.show500, { err }, done);
      }

      return;
    }

    done();
  }

});

app.plug(fetchrPlugin({
  xhrPath: "/api"
}));

app.plug(routrPlugin({
  routes: routes
}));

app.registerStore(FeaturedStore);
app.registerStore(HtmlHeadStore);
app.registerStore(IntlStore);
app.registerStore(PhotoStore);
app.registerStore(RouteStore);

export default app;
