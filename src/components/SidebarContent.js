import React from "react";
import { locales } from "../config";
import { NavLink } from "fluxible-router";

import Loader from "../components/Loader";

if (process.env.BROWSER) {
  require("../style/SidebarContent.scss");
}

const EXPLORE_LINKS = [{
  feature: "popular",
  url: "/featured/popular",
  label: "Popular"
}, {
  feature: "highest_rated",
  url: "/featured/highest_rated",
  label: "Highest Rated"
}, {
  feature: "upcoming",
  url: "/featured/upcoming",
  label: "Upcoming"
}, {
  feature: "editors",
  url: "/featured/editors",
  label: "Editors Picks"
}, {
  feature: "fresh_today",
  url: "/featured/fresh_today",
  label: "Fresh Today"
}, {
  feature: "fresh_yesterday",
  url: "/featured/fresh_yesterday",
  label: "Fresh Yesterday"
}, {
  feature: "fresh_week",
  url: "/featured/fresh_week",
  label: "Fresh This Week"
}]

function renderLink(loadingUrl, currentRoute=null, currentFeature=null) {
  return link => {
    const currentUrl = currentRoute && currentRoute.get("url");
    const currentRouteName = currentRoute && currentRoute.get("name");
    const isActive = (!loadingUrl && currentUrl === link.url) ||
      (currentRouteName === "photo" && currentFeature === link.feature)

    let className = "SidebarContent-link";

    if (isActive) {
      className += " SidebarContent-link--active";
    }
    return (
      <NavLink key={ link.url } className={ className } href={ link.url }>
        { link.label }
        <Loader small isActive={link.url === loadingUrl} />
      </NavLink>
    )
  }
}

export default function SidebarContent( { loadingUrl, currentRoute, currentFeature }) {
  return (
    <div className="SidebarContent">

      <div className="SidebarContent--top">
        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Explore</div>
          { EXPLORE_LINKS.map(renderLink(loadingUrl, currentRoute, currentFeature)) }
        </div>

        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Isomorphic500</div>
          <a href="x" className="SidebarContent-link">About this project</a>
        </div>


        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Experiment</div>
          {[
            renderLink(loadingUrl, currentRoute)({
              url: "/bad",
              label: "Route with server error"
            }),
            renderLink(loadingUrl, currentRoute)({
              url: "/photo/what",
              label: "Not existing photo"
            }),
            renderLink(loadingUrl, currentRoute)({
              url: "/not-defined",
              label: "Undefined route"
            })
          ]}
        </div>
      </div>

      <div className="SidebarContent--bottom">
        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Switch language</div>

          {
            Object.keys(locales).map((locale, i, arr) =>
              <span key={locale}>
                <a href={`?hl=${locale}`}>
                  { locales[locale] }
                </a>
                { i < arr.length - 1 && " | " }
              </span>
            )
          }

        </div>
      </div>


    </div>
  );
}
