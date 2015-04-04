import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/**
 * Stores an object of arrays with the featured photos id, e.g.
 * {
 *   "popular": [1, 2, 3, 4],
 *   "editors": [5, 6, 7] ...
 * }
 */

class FeaturedStore extends BaseStore {

  static storeName = "FeaturedStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "onLoadSuccess",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.featured = {};
    this.currentFeature = null;
  }

  onLoadSuccess({ feature, photos }) {

    this.featured[feature] = photos.map(photo => photo.id);
    this.currentFeature = feature;

    this.emitChange();
  }

  getFeaturedPhotos(feature) {
    return this.featured[feature];
  }

  getCurrentFeature() {
    return this.currentFeature;
  }

  dehydrate() {
    return {
      featured: this.featured,
      currentFeature: this.currentFeature
    };
  }

  rehydrate({ featured, currentFeature }) {
    this.featured = featured;
    this.currentFeature = currentFeature;
  }

}


export default FeaturedStore;
