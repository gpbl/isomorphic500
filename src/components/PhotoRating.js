import React, { Component } from "react";
import { FormattedMessage, FormattedNumber } from "../utils/IntlComponents";

class PhotoRating extends Component {

  render() {
    const { rating } = this.props;

    return (
      <FormattedMessage
        message="photo.rating"
        rating={ <FormattedNumber value={ rating } /> }
      />
    );
  }

}

export default PhotoRating;
