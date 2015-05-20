import { get } from "../utils/APIUtils";

// Fetchr service to load a photo given an id.

export default {
  name: "photo",

  read(req, resource, { id, imageSize=1600 }, config, done) {
    const query = {
      "image_size": imageSize
    };
    const options = {
      locale: req.locale
    };
    get(`/photos/${id}`, query, options, done);
  }

};
