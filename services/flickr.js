// service to call flickr api
// based on https://github.com/yahoo/fetchr/blob/master/examples/simple/server/fetchers/flickr.js

import superagent from 'superagent';
import querystring from 'querystring';

const apiKey = 'caa7cdd862282d6c9c7051bef11eb7a8';
const apiRoot = 'https://api.flickr.com/services/rest/';

export default {

  name: 'flickr',

  read(req, resource, params, config, callback) {
    
    const params = {
      api_key: apiKey,
      method: 'flickr.photos.getRecent',
      per_page: 10,
      format: 'json',
      nojsoncallback: 1
    };

    const url = `${apiRoot}?${querystring.stringify(params)}`;
    
    superagent.get(url).end((err, res) => {
      const photos = !err ? res.body.photos.photo : null;
      callback(err, photos);
    });

  }

};