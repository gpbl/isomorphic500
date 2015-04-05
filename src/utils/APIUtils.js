// Utils to send requests to the 500px API endpoint

import request from "superagent";
import { assign } from "lodash";

import config from "../config";

const debug = require("debug")("isomorphic500");

const APIUtils = {

  get(endpoint, query, { locale }, done) {
    if (arguments.length === 2) {
      done = query;
      query = {};
    }

    const url = `${config.apiRoot}${endpoint}`;

    debug("Sending GET request to %s", url, query);

    // Customer key is required by the API
    query = assign(query, {
      "consumer_key": config.consumerKey
    });

    request.get(url)
      .set("accept-language", locale)
      .query(query)
      .end((err, res) => {
        debug("Received response %s from %s", res.status, url);

        if (err) {
          if (err.status) {
            // Normalize statusCode vs. status
            err.statusCode = err.status;
          }

          return done(err);
        }

        done(null, res.body);
      });
  }

};

export default APIUtils;
