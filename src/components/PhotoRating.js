import React, { Component } from "react";
import { FormattedMessage, FormattedNumber } from "../utils/IntlComponents";

export default class PhotoRating extends Component {

  render() {
    const { rating } = this.props;

    return (
      <FormattedMessage
        id="photo.rating"
        values={{
          rating: <FormattedNumber value={ rating } />
        }}
      />
    );
  }

}
