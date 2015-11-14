import React from "react";

import { NavLink } from "fluxible-router";

if (process.env.BROWSER) {
  require("../style/Thumbnail.scss");
}

export default function Thumbnail({ photo }) {

  const style = {
    backgroundImage: `url("${photo.images[0].url}")`
  };

  return (
    <div className="Thumbnail">
      <NavLink
        className="Thumbnail-content"
        style={ style }
        routeName="photo"
        navParams={{ id: photo.id }}
      />
    </div>
  );
}
