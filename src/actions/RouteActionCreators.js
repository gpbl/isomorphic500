import Actions from "../constants/Actions";

const RouteActionCreators = {

  show404(context, payload, done) {
    context.dispatch(Actions.STATUS_404, payload);
    done();
  },

  show500(context, payload, done) {
    context.dispatch(Actions.STATUS_500, payload);
    done();
  }

};

export default RouteActionCreators;
