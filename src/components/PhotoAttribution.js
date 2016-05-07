import React, { PropTypes, Component } from "react";
import { FormattedMessage } from "../utils/IntlComponents";

export default class PhotoAttribution extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <FormattedMessage
        id="photo.attribution"
        values={{
          userLink: <a href={ `https://500px.com/${user.username}` }>{ user.fullname }</a>
        }}
      />
    );
  }

}
