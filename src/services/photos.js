import { get } from "../utils/APIUtils";

export default {
  name: "photos",

  read(req, resource, { feature, imageSize=4 }, config, done) {
    get("/photos", {
      feature,
      "image_size": imageSize
    }, {
      locale: req.locale
    }, done);
  }

};
