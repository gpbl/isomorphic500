import React, { PropTypes, Component } from "react";

import PhotoAttribution from "../components/PhotoAttribution";
import PhotoRating from "../components/PhotoRating";
import PhotoCreatedAt from "../components/PhotoCreatedAt";

if (process.env.BROWSER) {
  require("../style/PhotoMeta.scss");
}

export default class PhotoMeta extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    const { photo } = this.props;

    return (
      <div className="PhotoMeta">
        <PhotoAttribution user={ photo.user } />
        <PhotoCreatedAt date={ photo.created_at } />
        <PhotoRating rating={ photo.rating } />
      </div>
    );
  }

}
