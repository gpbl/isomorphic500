function fooAction(context, payload, done) {
  context.dispatch("FOO", payload);
  done();
}

export default fooAction;
