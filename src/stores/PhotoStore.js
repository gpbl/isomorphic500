import { BaseStore } from "fluxible/addons";
import Actions from "../constants/Actions";
import _ from "lodash";

/*
This is a "resource store", holding the photo objects loaded by the app.
Photo objects can come either loading a single photo (`LOAD_PHOTO_SUCCESS`)
or after loading featured photos (`LOAD_FEATURED_PHOTOS_SUCCESS`).
*/

export default class PhotoStore extends BaseStore {

  static storeName = "PhotoStore"

  static handlers = {
    [Actions.LOAD_FEATURED_PHOTOS_SUCCESS]: "handleLoadFeaturedSuccess",
    [Actions.LOAD_PHOTO_SUCCESS]: "handleLoadSuccess"
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.photos = {};
  }

  handleLoadSuccess(photo) {
    this.photos[photo.id] = _.merge({}, this.photos[photo.id], photo);
    this.emitChange();
  }

  handleLoadFeaturedSuccess({ photos }) {
    this.photos = _(photos).keyBy("id").merge(this.photos).value();
    this.emitChange();
  }

  get(id, minSize=0) {
    return _.find(this.photos, photo =>
      photo.id === parseInt(id) && photo.images[0].size >= minSize
    );
  }

  getMultiple(ids) {
    return ids.map(id => this.photos[id]);
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
