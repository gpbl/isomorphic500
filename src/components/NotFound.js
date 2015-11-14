import React from "react";
import { FormattedMessage } from "../utils/IntlComponents";

if (process.env.BROWSER) {
  require("../style/NotFound.scss");
}

export default function NotFound() {
  return (
    <div className="NotFound">
      <FormattedMessage message="meta.notFoundTitle" />
    </div>
  );
}
