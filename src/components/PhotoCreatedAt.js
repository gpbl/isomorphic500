import React, { PropTypes, Component } from "react";
import FormattedDate from "../utils/FormattedDate";

class PhotoCreatedAt extends Component {

  static propTypes = {
    date: PropTypes.string.isRequired
  }

  render() {
    const { date } = this.props;

    return (
      <FormattedDate value={new Date(date)} year="numeric" month="long" day="numeric" />
    );
  }

}

export default PhotoCreatedAt;
