import React from "react";
import Sidebar from "../components/Sidebar";
import SidebarContent from "../components/SidebarContent";
import Header from "../components/Header";

if (process.env.BROWSER) {
  require("../style/Page.scss");
}

export default function Page({ children, loadingUrl, currentFeature }) {
  return (
    <div className="Page">
      <div>
        <Sidebar>
          <SidebarContent currentFeature={ currentFeature } loadingUrl={ loadingUrl } />
        </Sidebar>
      </div>
      <div className="Page-content">
        <Header isLoading={ loadingUrl } />
        { children }
      </div>
    </div>
  );
}
