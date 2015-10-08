import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". This one keeps the `id` of the photos in PhotoStore
when the featured photos has been loaded.
 */

export default class FeaturedStore extends BaseStore {

  static storeName = "FeaturedStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.featured = [];
    this.currentFeature = null;
  }

  handleLoadSuccess({ feature, photos }) {
    this.dispatcher.waitFor("PhotoStore", () => {
      this.currentFeature = feature;
      this.featured = photos.map(photo => photo.id);
      this.emitChange();
    });
  }

  getFeaturedPhotos() {
    return this.featured;
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

  rehydrate(state) {
    this.featured = state.featured;
    this.currentFeature = state.currentFeature;
  }

}
