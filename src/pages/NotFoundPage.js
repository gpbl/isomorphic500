import React from "react";
import { FormattedMessage } from "../utils/IntlComponents";

class NotFoundPage extends React.Component {

  render() {
    return (
      <div>
        <h1><FormattedMessage message="meta.notFoundTitle" /></h1>
      </div>
    );
  }

}

export default NotFoundPage;
