import React, { PropTypes, Component } from "react";
import { FormattedDate, FormattedRelative } from "../utils/IntlComponents";

export default class PhotoCreatedAt extends Component {

  static propTypes = {
    date: PropTypes.string.isRequired
  }

  render() {
    const { date } = this.props;

    return (
      <div>
        <FormattedDate value={ new Date(date) } year="numeric" month="long" day="numeric" />
        { ' ' }
        (<FormattedRelative value={ new Date(date) } />)
      </div>
    );
  }

}
