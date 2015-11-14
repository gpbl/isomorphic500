import Actions from "../constants/Actions";

export default {

  loadIntlMessages(context, { locale }, done) {
    context.dispatch(Actions.LOAD_INTL_SERVER, require(`../intl/${locale}`));
    done();
  }

};
