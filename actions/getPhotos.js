import { RECEIVE_PHOTOS } from './';

export default function (context, payload, done) {
  context.service.read('500px', {}, {}, function (err, photos) {
    context.dispatch(RECEIVE_PHOTOS, photos);
    done();
  });
};