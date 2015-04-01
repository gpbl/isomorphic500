
import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import routrPlugin from "fluxible-plugin-routr";
import RouteActionCreators from "./actions/RouteActionCreators";
import routes from "./routes";

// The Application root component
import Application from "./Application";

// Stores
import RouteStore from "./stores/RouteStore";

const app = new Fluxible({
  component: Application,
  componentActionHandler(context, payload, done) {
    // This action handler will be called for actions executed in the component
    // context: it's the right place to intercept any error and
    // display the error page
    const { err } = payload;
    if (err) {
      const { status, statusCode } = err;
      if (status && status === 404 || statusCode && statusCode === 404) {
        context.executeAction(RouteActionCreators.show404, payload, done);
      } else {
        console.log(err.stack || payload.err);
        context.executeAction(RouteActionCreators.show500, payload, done);
      }

      return;
    }

    done();
  }

});

// Add plugin to fluxible app
app.plug(fetchrPlugin({
  xhrPath: "/api"
}));

app.plug(routrPlugin({
  routes: routes
}));

// Register stores
app.registerStore(RouteStore);

export default app;
