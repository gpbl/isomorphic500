import React, { PropTypes, Component } from "react";
import FormattedMessage from "../utils/FormattedMessage";

class PhotoAttribution extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <FormattedMessage
        message="photo.attribution"
        userLink={
          <a href={`https://500px.com/${user.username}`}>{ user.fullname }</a>
        }
      />
    );
  }

}

export default PhotoAttribution;
