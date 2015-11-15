import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "list store", i.e. it holds only ids referring to another
"resource store". It keeps the `id` of the photos in PhotoStore
when the featured photos have been loaded.
 */

export default class FeaturedStore extends BaseStore {

  static storeName = "FeaturedStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "handleLoadSuccess"
  }

  featured = {}
  currentFeature = null

  getCurrentFeature() {
    return this.currentFeature;
  }

  getFeaturedPhotos(feature) {
    if (feature in this.featured) {
      return this.featured[feature];
    }
    return [];
  }

  handleLoadSuccess({ feature, photos }) {
    // Wait the PhotoStore handle LOAD_FEATURED_PHOTOS_SUCCESS action first
    this.dispatcher.waitFor("PhotoStore", () => {
      this.currentFeature = feature;
      this.featured = {
        ...this.featured,
        [feature]: photos.map(photo => photo.id)
      };
      this.emitChange();
    });
  }

  dehydrate() {
    return {
      currentFeature: this.currentFeature,
      featured: this.featured
    };
  }

  rehydrate(state) {
    this.currentFeature = state.currentFeature;
    this.featured = state.featured;
  }

}
