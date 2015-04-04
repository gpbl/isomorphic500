import Actions from "../constants/Actions";

const PhotoActionCreators = {

  loadFeaturedPhotos(context, { feature="popular" }, done) {

    context.dispatch(Actions.LOAD_FEATURED_PHOTOS_START, { feature });

    context.service.read("photos", { feature }, { timeout: 20000 },
      (err, data) => {
        if (err) {
          context.dispatch(Actions.LOAD_FEATURED_PHOTOS_FAILURE, { feature });
          return done(err);
        }

        context.dispatch(Actions.LOAD_FEATURED_PHOTOS_SUCCESS, {
          feature,
          photos: data.photos
        });
        done();
      }

    );
  },

  loadPhoto(context, { id, imageSize }, done) {

    if (context.getStore("PhotoStore").get(id, imageSize)) {
      return done();
    }

    context.dispatch(Actions.LOAD_PHOTO_START, { id, imageSize });

    context.service.read("photo", { id, imageSize }, { timeout: 20000 },
      (err, photos) => {
        if (err) {
          context.dispatch(Actions.LOAD_PHOTO_FAILURE, { id, imageSize });
          return done(err);
        }

        context.dispatch(Actions.LOAD_PHOTO_SUCCESS, photos);
        done();
      }

    );
  }

};

export default PhotoActionCreators;
