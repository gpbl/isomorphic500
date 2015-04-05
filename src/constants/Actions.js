import keyMirror from "react/lib/keyMirror";

const Actions = keyMirror({

  CHANGE_ROUTE_SUCCESS: null,
  CHANGE_ROUTE_START: null,
  STATUS_404: null,
  STATUS_500: null,

  LOAD_FEATURED_PHOTOS_START: null,
  LOAD_FEATURED_PHOTOS_SUCCESS: null,
  LOAD_FEATURED_PHOTOS_FAILURE: null,

  LOAD_PHOTO_START: null,
  LOAD_PHOTO_SUCCESS: null,
  LOAD_PHOTO_FAILURE: null,

  LOAD_INTL: null

});

export default Actions;
