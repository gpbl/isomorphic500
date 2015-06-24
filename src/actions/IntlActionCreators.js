import Actions from "../constants/Actions";

const IntlActionCreators = {

  loadIntlMessages(context, { locale }, done) {
    context.dispatch(Actions.LOAD_INTL_SERVER, require(`../intl/${locale}`));
    done();
  }

};

export default IntlActionCreators;
