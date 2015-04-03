// Actions to run when the router matches a route. Used in ./routes.js

import PhotoActionCreators from "../actions/PhotoActionCreators";

const RouteActions = {

  featuredPage(context, payload, done) {
    context.executeAction(PhotoActionCreators.loadFeaturedPhotos, {
      feature: payload.params.feature
    }, done);
  },

  photoPage(context, payload, done) {
    context.executeAction(PhotoActionCreators.loadPhoto, {
      id: payload.params.id
    }, done);
  },

  badPage(context, payload, done) {
    const err = new Error();
    err.message = "Do not worry, just giving a try.";
    done(err);
  }

};

export default RouteActions;
