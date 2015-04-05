import { get } from "../utils/APIUtils";

export default {
  name: "photo",

  read(req, resource, { id, imageSize=1600 }, config, done) {
    get(`/photos/${id}`, {
      "image_size": imageSize
    }, {
      locale: req.locale
    }, done);
  }

};
