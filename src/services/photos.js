
import { get } from "../utils/APIUtils";

export default {
  name: "photos",

  read(req, resource, params, config, done) {
    get("/photos", {
      image_size: params.imageSize || 4,
    }, done);
  }
};
