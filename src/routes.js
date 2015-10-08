
import InitActions from "./containers/InitActions";

import features from "./constants/features";

import HomePage from "./containers/HomePage";
import PhotoPage from "./containers/PhotoPage";
import FeaturedPage from "./containers/FeaturedPage";

export default {

  home: {
    path: "/",
    method: "get",
    handler: HomePage
  },

  featured: {
    path: `/featured/:feature(${features.join("|")})`,
    method: "get",
    handler: FeaturedPage,
    action: InitActions.featuredPage
  },

  photo: {
    path: "/photo/:id",
    method: "get",
    handler: PhotoPage,
    action: InitActions.photoPage
  },

  // This route doesn't point to any handler.
  // I made it just as example for showing an action responding with an error
  bad: {
    path: "/bad",
    method: "get",
    action: InitActions.badPage
  }

};
