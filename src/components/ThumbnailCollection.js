import React from "react";

import Thumbnail from "../components/Thumbnail";

if (process.env.BROWSER) {
  require("../style/ThumbnailCollection.scss");
}

export default function ThumbnailCollection({ photos=[] }) {

  return (
    <div className="ThumbnailCollection">
      { photos.map(photo => <Thumbnail key={ photo.id } photo={ photo } /> ) }
    </div>
  )
}
