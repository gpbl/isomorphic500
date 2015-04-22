import { get } from "../utils/APIUtils";

// Fetchr service to load photos for the given feature.

export default {
  name: "photos",

  read(req, resource, { feature, imageSize=4 }, config, done) {
    const query = {
      feature: feature,
      "image_size": imageSize
    };
    const options = {
      locale: req.locale
    };
    get("/photos", query, options, done);
  }

};
