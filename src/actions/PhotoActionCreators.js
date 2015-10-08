import Actions from "../constants/Actions";

// Tip: in your fetchr service calls, make sure you set a timeout higher than
// the default of 3000ms. See https://github.com/yahoo/fetchr/issues/58
const TIMEOUT = 20000;

export default {

  loadFeaturedPhotos(context, { feature="popular" }, done) {

    context.service.read("photos", { feature }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }

        context.dispatch(Actions.LOAD_FEATURED_PHOTOS_SUCCESS, {
          feature: feature,
          photos: data.photos
        });

        done();
      }

    );
  },

  loadPhoto(context, { id, imageSize }, done) {

    context.service.read("photo", { id, imageSize }, { timeout: TIMEOUT },
      (err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_PHOTO_SUCCESS, data.photo);
        done();
      }

    );
  }

};
