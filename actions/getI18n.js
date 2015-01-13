export default function (context, payload, done) {
  context.service.read('i18n', payload, {}, function (err, data) {
    if (err) {
      context.dispatch('RECEIVE_INTL_FAILURE', {
        payload: payload,
        err: err
      });
    } else {
      data.currentLocale = payload.locale;
      context.dispatch('RECEIVE_INTL_SUCCESS', data);
    }
    done();
  });
};