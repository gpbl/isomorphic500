export default function (context, payload, done) {
  context.service.read('i18n', payload, {}, function (err, i18n) {
    if (err) context.dispatch('RECEIVE_INTL_FAILURE', {
      payload: payload,
      err: err
    });
    else context.dispatch('RECEIVE_INTL_SUCCESS', i18n);
    done();
  });
};