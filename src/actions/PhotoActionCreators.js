import Actions from "../constants/Actions";

const PhotoActionCreators = {

  // Load featured photos:
  // payload = { feature: "fresh_today" }
  loadFeaturedPhotos(context, payload, done) {

    const feature = payload.feature || "popular";
    context.dispatch(Actions.LOAD_FEATURED_PHOTOS_START, payload);
    context.service.read("photos", { feature: feature }, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_FEATURED_PHOTOS_FAILURE, payload);
          return done(err);
        }

        context.dispatch(Actions.LOAD_FEATURED_PHOTOS_SUCCESS, {
          feature: feature,
          results: data
        });
        done();
      }

    );
  },

  // Load a photo:
  // payload = { id: "photo_id", imageSize: 5 }
  loadPhoto(context, payload, done) {

    if (context.getStore("PhotoStore").get(payload.id, payload.imageSize)) {
      return done();
    }

    context.dispatch(Actions.LOAD_PHOTO_START, payload);
    context.service.read("photo", payload, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_PHOTO_FAILURE, payload);
          return done(err);
        }

        context.dispatch(Actions.LOAD_PHOTO_SUCCESS, data);
        done();
      }

    );
  }

};

export default PhotoActionCreators;
