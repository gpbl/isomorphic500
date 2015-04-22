import React, { PropTypes, Component } from "react";
import FormattedMessage from "../utils/FormattedMessage";
import FormattedNumber from "../utils/FormattedNumber";

class PhotoRating extends Component {

  render() {
    const { rating } = this.props;

    return (
      <FormattedMessage
        message="photo.rating"
        rating={<FormattedNumber value={rating} />}
      />
    );
  }

}

export default PhotoRating;
