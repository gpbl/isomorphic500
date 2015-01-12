export default function (context, payload, done) {
  context.service.read('flickr', {}, {}, function (err, photos) {
    context.dispatch('RECEIVE_PHOTOS', photos);
    done();
  });
};