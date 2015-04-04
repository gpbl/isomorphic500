import Actions from "../constants/Actions";

const RouteActionCreators = {

  show404(context, { err }, done) {
    context.dispatch(Actions.STATUS_404, { err });
    done();
  },

  show500(context, { err }, done) {
    context.dispatch(Actions.STATUS_500, { err });
    done();
  }

};

export default RouteActionCreators;
