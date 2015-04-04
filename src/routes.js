
import RouteActions from "./pages/RouteActions";

import features from "./constants/features";

export default {

  home: {
    path: "/",
    method: "get",
    action: RouteActions.featuredPage
  },

  featured: {
    path: `/featured/:feature(${features.join("|")})`,
    method: "get",
    action: RouteActions.featuredPage
  },

  photo: {
    path: "/photo/:id",
    method: "get",
    action: RouteActions.photoPage
  },

  bad: {
    path: "/bad",
    method: "get",
    action: RouteActions.badPage
  }

};
