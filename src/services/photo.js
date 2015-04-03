import { get } from "../utils/APIUtils";

export default {
  name: "photo",

  read(req, resource, params, config, done) {
    get(`/photos/${params.id}`, {
      image_size: params.imageSize || 1600,
      tags: true
    }, done)
  }
};
