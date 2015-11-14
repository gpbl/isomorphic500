import React from "react";

if (process.env.BROWSER) {
  require("../style/ErrorDetail.scss");
}

export default function ErrorDetail({ err }) {
  return (
    <div className="ErrorDetail">

      <div className="ErrorDetail-message">
        There was an error while displaying this page.
      </div>

      { process.env.NODE_ENV === "development" && err &&
        <div className="ErrorDetail-info">
          { err.message }
          { err.stack }
        </div>
      }

    </div>
  );
}
