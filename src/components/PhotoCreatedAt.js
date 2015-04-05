import React, { PropTypes, Component } from "react";
import FormattedDate from "../components/FormattedDate";

class PhotoCreatedAt extends Component {

  render() {
    const { date } = this.props;

    return (
      <FormattedDate value={new Date(date)} year="numeric" month="long" day="numeric" />
    );
  }

}

export default PhotoCreatedAt;
