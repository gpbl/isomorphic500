import superagent from 'superagent';
import apiKey from '../config/500px-key.js';
const apiRoot = 'https://api.500px.com/v1/';

export default {

  name: '500px',

  read(req, resource, params, config, callback) {
    const url = `${apiRoot}/photos?consumer_key=${apiKey}`;
    superagent.get(url)
      .query({
        feature: 'upcoming',
        only: 'Nature,Landscapes',
        image_size: 4
      })
      .end((err, res) => {
      const photos = !err ? res.body.photos : null;
      callback(err, photos);
    });
  }

};