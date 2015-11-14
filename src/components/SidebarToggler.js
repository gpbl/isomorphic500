import React from "react";
import classNames from "classnames";

if (process.env.BROWSER) {
  require("../style/SidebarToggler.scss");
}

export default function SidebarToggler({ showCloseButton, className, style, onClick }) {

  className = classNames("SidebarToggler", className, {
    "SidebarToggler--close": showCloseButton
  });

  return (
    <div key="toggler" className={ className } style={ style } onClick={ onClick }>
      <div className="SidebarToggler-top" />
      <div className="SidebarToggler-middle" />
      <div className="SidebarToggler-bottom" />
    </div>
  );
}
