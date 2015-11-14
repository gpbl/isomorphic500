import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

if (process.env.BROWSER) {
  require("../style/Loader.scss");
}

export default function Loader({ isActive=false, small=false }) {
  let className = "Loader";
  if (small) {
    className += " Loader--small";
  }
  return (
    <ReactCSSTransitionGroup
      transitionName="Loader"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={200}>

      { isActive && <div key="loader" className={ className } /> }

    </ReactCSSTransitionGroup>
  );
}
