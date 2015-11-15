
import { loadFeaturedPhotos, loadPhoto } from "./actions/photos";

import features from "./constants/features";

import HomePage from "./containers/HomePage";
import PhotoPage from "./containers/PhotoPage";
import FeaturedPage from "./containers/FeaturedPage";

export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage,
    action(context, route, done) {
      context.executeAction(loadFeaturedPhotos, { feature: "popular" }, done);
    }
  },

  featured: {
    path: `/featured/:feature(${features.join("|")})`,
    method: "get",
    handler: FeaturedPage,
    action(context, route, done) {
      const feature = route.getIn(["params", "feature"]);
      context.executeAction(loadFeaturedPhotos, { feature }, done);
    }
  },

  photo: {
    path: "/photo/:id",
    method: "get",
    handler: PhotoPage,
    action(context, route, done) {
      const id = route.getIn(["params", "id"]);
      context.executeAction(loadPhoto, { id }, done);
    }
  },

  // Example showing an action throwing an error
  bad: {
    path: "/bad",
    method: "get",
    handler: HomePage,
    action(context, route, done) {
      try {
        throw new Error("This is just a simulation of a server-side error while loading a route")
      }
      catch(e) {
        done(e);
      }
    }
  }

};
