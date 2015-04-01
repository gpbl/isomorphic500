import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import { FluxibleComponent } from "fluxible";
import app from "./app";

window.debug = require("debug");

const debug = window.debug("isomorphic500");

const dehydratedState = window.App;
const mountNode = document.getElementById("root");

injectTapEventPlugin();

app.rehydrate(dehydratedState, (err, context) => {
  if (err) {
    throw err;
  }

  const ApplicationComponent = app.getComponent();
  React.render(
    <FluxibleComponent context={context.getComponentContext()}>
      <ApplicationComponent />
    </FluxibleComponent>,
    mountNode,
    () => {
      debug("Application has been mounted");
    }

  );
});
