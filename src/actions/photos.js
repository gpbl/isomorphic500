import Actions from "../constants/Actions";

export default {

  loadFeaturedPhotos(context, { feature="popular" }, done) {

    context.service.read("photos")
      .params({ feature })
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_FEATURED_PHOTOS_SUCCESS, {
          feature: feature,
          photos: data.photos
        });
        done();
      });

  },

  loadPhoto(context, { id }, done) {

    context.service.read("photo")
      .params({ id })
      .end((err, data) => {
        if (err) {
          return done(err);
        }
        context.dispatch(Actions.LOAD_PHOTO_SUCCESS, data.photo);
        done();
      });

  }

};
