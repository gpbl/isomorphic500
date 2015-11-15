import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";

/*
This is a "resource store", holding the photo objects loaded by the app.
Photo objects can come either loading a single photo (`LOAD_PHOTO_SUCCESS`)
or after loading featured photos (`LOAD_FEATURED_PHOTOS_SUCCESS`).
*/

export default class PhotoStore extends BaseStore {

  static storeName = "PhotoStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "handleLoadFeaturedSuccess",
    [Actions.LOAD_PHOTO_SUCCESS]: "handleLoadPhotoSuccess"
  }

  photos = {};

  get(id) {
    return this.photos[id];
  }

  getMultiple(ids) {
    return ids.map(id => this.photos[id]);
  }

  handleLoadPhotoSuccess(photo) {
    this.photos[photo.id] = photo;
    this.emitChange();
  }

  handleLoadFeaturedSuccess({ photos }) {
    photos.forEach(photo => this.photos[photo.id] = photo)
    this.emitChange();
  }

  dehydrate() {
    return {
      photos: this.photos
    };
  }

  rehydrate(state) {
    this.photos = state.photos;
  }

}
