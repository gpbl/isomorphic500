import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import routrPlugin from "fluxible-plugin-routr";
import RouteActionCreators from "./actions/RouteActionCreators";
import routes from "./routes";

import Application from "./Application";

import RouteStore from "./stores/RouteStore";
import PhotoStore from "./stores/PhotoStore";

const app = new Fluxible({

  component: Application,

  componentActionHandler(context, payload, done) {

    // This action handler is called for any action executed in the component's
    // context. It's the right place to intercept action errors and display an
    // error page.

    const { err } = payload;

    if (err) {
      const { status, statusCode } = err;

      if (status && status === 404 || statusCode && statusCode === 404) {
        context.executeAction(RouteActionCreators.show404, payload, done);
      }
      else {
        console.log(err.stack || payload.err);
        context.executeAction(RouteActionCreators.show500, payload, done);
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

app.registerStore(RouteStore);
app.registerStore(PhotoStore);

export default app;
