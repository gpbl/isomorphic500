const RouteActionCreators = {

  show404(context, payload, done) {
    context.dispatch("STATUS_404", payload);
    done();
  },

  show500(context, payload, done) {
    context.dispatch("STATUS_500", payload);
    done();
  }

};

export default RouteActionCreators;
