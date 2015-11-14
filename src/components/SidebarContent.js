import React from "react";
import { locales } from "../config";
import { NavLink } from "fluxible-router";

import Loader from "../components/Loader";

if (process.env.BROWSER) {
  require("../style/SidebarContent.scss");
}

const links = [
  {
    feature: "popular",
    href: "/featured/popular",
    label: "Popular"
  },
  {
    feature: "highest_rated",
    href: "/featured/highest_rated",
    label: "Highest Rated"
  },
  {
    feature: "upcoming",
    href: "/featured/upcoming",
    label: "Upcoming"
  },
  {
    feature: "editors",
    href: "/featured/editors",
    label: "Editors Picks"
  },
  {
    feature: "fresh_today",
    href: "/featured/fresh_today",
    label: "Fresh Today"
  },
  {
    feature: "fresh_yesterday",
    href: "/featured/fresh_yesterday",
    label: "Fresh Yesterday"
  },
  {
    feature: "fresh_week",
    href: "/featured/fresh_week",
    label: "Fresh This Week"
  }
]

function renderLink(loadingUrl, currentFeature) {
  return (link, i) => {

    let className = "SidebarContent-link"
    if (currentFeature === link.feature) {
      className += " SidebarContent-link--active";
    }
    return (
      <NavLink key={i} className={ className } href={ link.href }>
        { link.label }
        <Loader small isActive={link.href === loadingUrl} />
      </NavLink>
    )
  }
}

export default function SidebarContent( { loadingUrl, currentFeature }) {

  return (
    <div className="SidebarContent">

      <div className="SidebarContent--top">
        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Explore</div>
          { links.map(renderLink(loadingUrl, currentFeature)) }
        </div>

        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Isomorphic500</div>
          <a href="x" className="SidebarContent-link">About this project</a>
        </div>


        <div className="SidebarContent-container">
          <div className="SidebarContent-title">Experiment</div>
          <NavLink className="SidebarContent-link" href="/bad">
            Route with server error
          </NavLink>
          <NavLink className="SidebarContent-link" href="/photo/what">
            An unexisting photo
          </NavLink>
          <NavLink className="SidebarContent-link" href="/not-defined">
            An undefined route
          </NavLink>
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
