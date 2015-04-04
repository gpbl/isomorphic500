import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import _ from "lodash";

class PhotoStore extends BaseStore {

  static storeName = "PhotoStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "onLoadFeaturedSuccess",
    [Actions.LOAD_PHOTO_SUCCESS]: "onLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);

    this.photos = {};
  }

  onLoadSuccess({ photo }) {
    this.photos[photo.id] = _.merge({}, this.photos[photo.id], photo);
    this.emitChange();
  }

  onLoadFeaturedSuccess({ feature, photos }) {
    this.photos = _(photos).indexBy("id").merge(this.photos).value();
    this.emitChange();
  }

  get(id, minSize=0) {
    return _.find(this.photos, photo =>
      photo.id === parseInt(id) && photo.images[0].size >= minSize
    );
  }

  dehydrate() {
    return {
      photos: this.photos,
      featured: this.featured,
      currentFeature: this.currentFeature
    };
  }

  rehydrate({ photos, featured, currentFeature }) {
    this.photos = photos;
    this.featured = featured;
    this.currentFeature = currentFeature;
  }

}


export default PhotoStore;
