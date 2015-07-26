import React from "react";
import FormattedMessage from "../utils/FormattedMessage";

class NotFoundPage extends React.Component {

  render() {
    return (
      <div>
        <FormattedMessage message="meta.notFoundTitle" />
      </div>
    );
  }

}

export default NotFoundPage;
