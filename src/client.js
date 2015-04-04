import React from "react";
import app from "./app";

window.debug = require("debug");

const debug = window.debug("isomorphic500");

const mountNode = document.getElementById("root");
const dehydratedState = window.App;

debug("Rehydrating state...", dehydratedState);

app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  debug("State has been rehydrated");

  const Application = app.getComponent();

  React.render(<Application context={context.getComponentContext()} />, mountNode, () => {
    debug("Application has been mounted");
  });
});
