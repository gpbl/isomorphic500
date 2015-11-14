import { get } from "../utils/APIUtils";

// Fetchr service to load photos for the given feature.

export default {
  name: "photos",

  read(req, resource, { feature }, config, done) {
    const query = {
      feature: feature,
      rpp: 36,
      "image_size[]": [600, 2048],
      exclude: "Nude,Uncategorized,Celebrities,People"
    };
    const options = {
      locale: req.locale
    };
    get("/photos", query, options, done);
  }

};
