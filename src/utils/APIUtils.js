// Utils to send requests to the api endpoint

import request from "superagent";
import config from "../config";
import { assign } from "lodash";

const debug = require("debug")("isomorphic500");

const APIUtils = {

  get(endpoint, query, done) {
    if (arguments.length === 2) {
      done = query;
      query = {};
    }

    const url = `${config.apiRoot}${endpoint}`;

    debug("Sending GET request to %s", url, query);

    query = assign(query, {
      consumer_key: config.consumerKey
    });

    request.get(url)
      .query(query)
      .end((err, res) => {
        debug("Received response %s from %s", res.status, url);

        if (err) {
          if (err.status) {
            // normalize statusCode vs. status
            err.statusCode = err.status;
          }

          return done(err);
        }

        done(null, res.body);
      });
  }

};

export default APIUtils;
