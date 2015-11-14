import React from "react";
import { NavLink } from "fluxible-router";
import Loader from "../components/Loader";

if (process.env.BROWSER) {
  require("../style/Header.scss");
}

export default function Header({ isLoading }) {
  return (
    <div className="Header">
      <div className="Header-wrapper">
        <NavLink href="/" className="Header-logo">
          <img src="/assets/logo.svg" />
        </NavLink>
      </div>
      <div className="Header-wrapper">
        <span className="Header-loader">
          <Loader isActive={ isLoading } />
        </span>
      </div>
    </div>
  )


}
