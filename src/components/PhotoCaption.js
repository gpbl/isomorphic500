import React from "react";

if (process.env.BROWSER) {
  require("../style/PhotoCaption.scss");
}

export default function PhotoCaption({ photo }) {
  return (
    <div className="PhotoCaption">
      <div className="PhotoCaption-header">
        <a href={`https://500px.com${photo.url}`}>
          “{ photo.name }”
        </a>

        <div className="PhotoCaption-author">
          by <a href={`https://500px.com/${photo.user.username}`}>
            { photo.user.username}
          </a>
        </div>
      </div>
    </div>
  );
}
