import Fluxible from "fluxible";
import fetchrPlugin from "fluxible-plugin-fetchr";
import { RouteStore } from "fluxible-router";

import routes from "./routes";

import Application from "./Application";

import FeaturedStore from "./stores/FeaturedStore";
import HtmlHeadStore from "./stores/HtmlHeadStore";
import IntlStore from "./stores/IntlStore";
import PhotoStore from "./stores/PhotoStore";

// Create the fluxible app using Application as root component
const app = new Fluxible({ component: Application });

// Make fetchr services respond to /api endpoint
app.plug(fetchrPlugin({ xhrPath: "/api" }));

// Register a fluxible RouteStore
const AppRouteStore = RouteStore.withStaticRoutes(routes);
app.registerStore(AppRouteStore);

// Register app-specific stores
app.registerStore(FeaturedStore);
app.registerStore(HtmlHeadStore);
app.registerStore(IntlStore);
app.registerStore(PhotoStore);

export default app;
